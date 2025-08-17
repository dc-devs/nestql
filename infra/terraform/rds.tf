resource "aws_db_subnet_group" "main" {
  name       = "${var.app_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_security_group" "rds" {
  name        = "${var.app_name}-rds-sg"
  description = "Allow ECS to access RDS"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "main" {
  identifier              = "${var.app_name}-db"
  engine                  = "postgres"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = var.db_name
  username                = var.db_username
  manage_master_user_password = true
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  skip_final_snapshot     = true
  publicly_accessible     = false
  multi_az                = false
  storage_encrypted       = true
  backup_retention_period = 7
  backup_window          = "03:00-04:00"  # UTC - adjust for your timezone
  maintenance_window     = "sun:04:00-sun:05:00"  # UTC
  copy_tags_to_snapshot  = true
  delete_automated_backups = true
  performance_insights_enabled = true
  monitoring_interval     = 60
  monitoring_role_arn    = aws_iam_role.rds_monitoring.arn
  deletion_protection    = false  # Keep false for MVP flexibility
  tags = {
    Name = "${var.app_name}-rds"
  }
} 

locals {
  db_host = aws_db_instance.main.address
}