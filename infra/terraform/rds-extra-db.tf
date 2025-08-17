// Create the additional database `mastra` on the same RDS instance
// Separate RDS instance for Mastra
resource "aws_db_subnet_group" "mastra" {
  name       = "${var.app_name}-mastra-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_security_group" "rds_mastra" {
  name        = "${var.app_name}-rds-mastra-sg"
  description = "Allow ECS to access Mastra RDS"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "mastra" {
  identifier                  = "${var.app_name}-mastra-db"
  engine                      = "postgres"
  instance_class              = "db.t3.micro"
  allocated_storage           = 20
  db_name                     = var.mastra_db_name
  username                    = var.db_username
  manage_master_user_password = true
  db_subnet_group_name        = aws_db_subnet_group.mastra.name
  vpc_security_group_ids      = [aws_security_group.rds_mastra.id]
  skip_final_snapshot         = true
  publicly_accessible         = false
  multi_az                    = false
  storage_encrypted           = true
  backup_retention_period     = 7
  backup_window               = "03:30-04:30"  # UTC - offset from main DB
  maintenance_window          = "sun:04:30-sun:05:30"  # UTC - offset from main DB
  copy_tags_to_snapshot       = true
  delete_automated_backups    = true
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn        = aws_iam_role.rds_monitoring.arn
  deletion_protection        = false  # Keep false for MVP flexibility
  tags = {
    Name = "${var.app_name}-rds-mastra"
  }
}

// Create a Secrets Manager secret for MASTRA_DATABASE_URL (value managed outside Terraform)
resource "aws_secretsmanager_secret" "mastra_database_url" {
  name = "${var.app_name}/MASTRA_DATABASE_URL"
}

