resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = var.app_name
      image     = "${aws_ecr_repository.app.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3001
          hostPort      = 3001
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.app.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = var.app_name
        }
      }
      environment = [
        { name = "NODE_ENV", value = var.environment },
        { name = "PORT", value = "3001" },
        { name = "NODE_EXTRA_CA_CERTS", value = "/etc/ssl/certs/rds-ca-bundle.pem" },
        { name = "PRISMA_DISABLE_ENV_LOADER", value = "1" }
      ]
      secrets = [
        { name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.database_url.arn },
        { name = "REDIS_URL", valueFrom = aws_secretsmanager_secret.redis_url.arn },
        { name = "SESSION_SECRET", valueFrom = aws_secretsmanager_secret.session_secret.arn },
        { name = "MASTRA_DATABASE_URL", valueFrom = aws_secretsmanager_secret.mastra_database_url.arn },
        { name = "OPENAI_API_KEY", valueFrom = aws_secretsmanager_secret.openai_api_key.arn },
        { name = "ANTHROPIC_API_KEY", valueFrom = aws_secretsmanager_secret.anthropic_api_key.arn }
      ]
    }
  ])
}

# Secrets Manager: store full URIs for DATABASE_URL, REDIS_URL, and session secret
resource "aws_secretsmanager_secret" "database_url" {
  name = "${var.app_name}/DATABASE_URL"
}

// Value will be set manually or via CI (outside Terraform)

resource "aws_secretsmanager_secret" "redis_url" {
  name = "${var.app_name}/REDIS_URL"
}

// Value will be set manually or via CI (outside Terraform)

resource "aws_secretsmanager_secret" "session_secret" {
  name = "${var.app_name}/SESSION_SECRET"
}

// Value will be set manually or via CI (outside Terraform)

resource "aws_secretsmanager_secret" "openai_api_key" {
  name = "${var.app_name}/OPENAI_API_KEY"
}

// Value will be set manually or via CI (outside Terraform)

resource "aws_secretsmanager_secret" "anthropic_api_key" {
  name = "${var.app_name}/ANTHROPIC_API_KEY"
}

// Value will be set manually or via CI (outside Terraform)

resource "aws_ecs_service" "app" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  launch_type     = "FARGATE"
  desired_count   = var.ecs_desired_count
  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = var.app_name
    container_port   = 3001
  }
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  depends_on = [aws_lb_listener.https]
} 