// Resolve the AWS-managed RDS master user secret to obtain username/password
data "aws_secretsmanager_secret" "rds_master" {
  arn = aws_db_instance.main.master_user_secret[0].secret_arn
  depends_on = [aws_db_instance.main]
}

data "aws_secretsmanager_secret_version" "rds_master_current" {
  secret_id = data.aws_secretsmanager_secret.rds_master.id
}

