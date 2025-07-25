resource "aws_ecr_repository" "app" {
  name = "${var.app_name}"
  image_tag_mutability = "MUTABLE"
  force_delete = true
  tags = {
    Name = "${var.app_name}-ecr"
  }
} 