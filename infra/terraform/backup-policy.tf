# =============================================================================
# Cost-Effective Backup Strategy for MVP
# =============================================================================
# This provides automated backups with reasonable costs:
# - Daily automated backups (7 days retention) - included in RDS pricing
# - Weekly manual snapshots (30 days retention) - minimal storage cost
# - Lifecycle management to control costs
# =============================================================================

# Lambda function for creating manual snapshots
resource "aws_lambda_function" "backup_creator" {
  filename         = "backup_lambda.zip"
  function_name    = "${var.app_name}-backup-creator"
  role            = aws_iam_role.backup_lambda.arn
  handler         = "index.handler"
  runtime         = "python3.11"
  timeout         = 300

  source_code_hash = data.archive_file.backup_lambda_zip.output_base64sha256

  environment {
    variables = {
      APP_NAME = var.app_name
    }
  }

  tags = {
    Name = "${var.app_name}-backup-creator"
  }
}

# Create the Lambda deployment package
data "archive_file" "backup_lambda_zip" {
  type        = "zip"
  output_path = "backup_lambda.zip"
  source {
    content = <<EOF
import boto3
import os
from datetime import datetime, timedelta
import json

def handler(event, context):
    rds = boto3.client('rds')
    app_name = os.environ['APP_NAME']
    
    # Current timestamp for unique snapshot names
    timestamp = datetime.now().strftime('%Y-%m-%d-%H%M%S')
    
    # List of RDS instances to backup
    db_instances = [
        f"{app_name}-db",
        f"{app_name}-mastra-db"
    ]
    
    results = []
    
    for db_instance in db_instances:
        try:
            # Create manual snapshot
            snapshot_id = f"{db_instance}-manual-{timestamp}"
            
            response = rds.create_db_snapshot(
                DBSnapshotIdentifier=snapshot_id,
                DBInstanceIdentifier=db_instance,
                Tags=[
                    {'Key': 'Type', 'Value': 'Manual'},
                    {'Key': 'CreatedBy', 'Value': 'AutoBackup'},
                    {'Key': 'RetentionDays', 'Value': '30'},
                    {'Key': 'App', 'Value': app_name}
                ]
            )
            
            results.append({
                'instance': db_instance,
                'snapshot': snapshot_id,
                'status': 'created'
            })
            
        except Exception as e:
            results.append({
                'instance': db_instance,
                'error': str(e),
                'status': 'failed'
            })
    
    # Clean up old manual snapshots (older than 30 days)
    try:
        snapshots = rds.describe_db_snapshots(
            SnapshotType='manual',
            MaxRecords=100
        )
        
        cutoff_date = datetime.now() - timedelta(days=30)
        
        for snapshot in snapshots['DBSnapshots']:
            # Only delete our app's snapshots
            if snapshot['DBSnapshotIdentifier'].startswith(app_name):
                if snapshot['SnapshotCreateTime'].replace(tzinfo=None) < cutoff_date:
                    rds.delete_db_snapshot(
                        DBSnapshotIdentifier=snapshot['DBSnapshotIdentifier']
                    )
                    results.append({
                        'snapshot': snapshot['DBSnapshotIdentifier'],
                        'status': 'deleted-old'
                    })
    except Exception as e:
        results.append({
            'cleanup': 'failed',
            'error': str(e)
        })
    
    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }
EOF
    filename = "index.py"
  }
}

# IAM role for Lambda backup function
resource "aws_iam_role" "backup_lambda" {
  name = "${var.app_name}-backup-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for Lambda to manage RDS snapshots
resource "aws_iam_role_policy" "backup_lambda_policy" {
  name = "${var.app_name}-backup-lambda-policy"
  role = aws_iam_role.backup_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "rds:CreateDBSnapshot",
          "rds:DeleteDBSnapshot",
          "rds:DescribeDBSnapshots",
          "rds:DescribeDBInstances",
          "rds:AddTagsToResource"
        ]
        Resource = "*"
      }
    ]
  })
}

# EventBridge rule to trigger weekly backups
resource "aws_cloudwatch_event_rule" "weekly_backup" {
  name                = "${var.app_name}-weekly-backup"
  description         = "Trigger weekly manual backups"
  schedule_expression = "cron(0 2 ? * SUN *)"  # Every Sunday at 2 AM UTC

  tags = {
    Name = "${var.app_name}-weekly-backup-rule"
  }
}

# EventBridge target to invoke Lambda
resource "aws_cloudwatch_event_target" "backup_lambda_target" {
  rule      = aws_cloudwatch_event_rule.weekly_backup.name
  target_id = "BackupLambdaTarget"
  arn       = aws_lambda_function.backup_creator.arn
}

# Permission for EventBridge to invoke Lambda
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backup_creator.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.weekly_backup.arn
}
