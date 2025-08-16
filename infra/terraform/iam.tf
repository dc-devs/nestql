resource "aws_iam_role" "ecs_task" {
  name = "${var.app_name}-ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_ssm_policy" {
  role       = aws_iam_role.ecs_task.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

# Remove broad SecretsManagerReadWrite from task role in favor of least privilege below

# Restrict task role to read specific secrets only (best practice: replace ReadWrite with least-privilege inline policy)
data "aws_iam_policy_document" "ecs_task_secrets_least_priv" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret"
    ]
    resources = [
      aws_secretsmanager_secret.database_url.arn,
      aws_secretsmanager_secret.redis_url.arn,
      aws_secretsmanager_secret.session_secret.arn,
      aws_secretsmanager_secret.mastra_database_url.arn,
      aws_secretsmanager_secret.openai_api_key.arn,
      aws_secretsmanager_secret.anthropic_api_key.arn
    ]
  }
}

resource "aws_iam_policy" "ecs_task_secrets_policy_least_priv" {
  name   = "${var.app_name}-ecs-task-secrets-policy"
  policy = data.aws_iam_policy_document.ecs_task_secrets_least_priv.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_secrets_policy_attach" {
  role       = aws_iam_role.ecs_task.name
  policy_arn = aws_iam_policy.ecs_task_secrets_policy_least_priv.arn
}

# Also attach the same read-only secrets policy to the execution role so ECS agent can fetch secrets at start
resource "aws_iam_role_policy_attachment" "ecs_execution_secrets_policy_attach" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = aws_iam_policy.ecs_task_secrets_policy_least_priv.arn
}