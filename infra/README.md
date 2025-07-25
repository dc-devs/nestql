# nestql AWS Infrastructure & CI/CD

## 1. Terraform Setup

1. Install [Terraform](https://www.terraform.io/downloads.html).
2. In the `infra/` directory, create a `terraform.tfvars` file with your secrets:

```
db_password = "<your-db-password>"
session_secret = "<your-session-secret>"
```

3. Initialize and apply:

```
cd infra
terraform init
terraform apply
```

4. After apply, note the outputs (ECR repo URL, ECS cluster/service names, ALB DNS, DB/Redis endpoints).

## 2. GitHub Actions Setup

1. In your GitHub repo, go to **Settings > Secrets and variables > Actions**.
2. Add these secrets (values from Terraform outputs):
   - `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (for a user with ECR/ECS permissions)
   - `ECR_REPOSITORY` (from `terraform output ecr_repository_url`)
   - `ECS_CLUSTER` (from `terraform output ecs_cluster_name`)
   - `ECS_SERVICE` (from `terraform output ecs_service_name`)
   - (Optional) `DATABASE_URL`, `REDIS_URL` if you want to run migrations in CI

## 3. Deploy Workflow

- On every push to `main`, GitHub Actions will:
  - Build and push your Docker image to ECR
  - Update the ECS service to use the new image
  - (Optionally) Run Prisma migrations

## 4. Accessing Your App

- Once deployed, your app will be available at the ALB DNS name (see `terraform output alb_dns_name`).

---

**Tip:** For production, consider using AWS Secrets Manager for sensitive env vars and rotating credentials regularly. 