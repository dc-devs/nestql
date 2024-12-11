#!/bin/bash
docker exec -it nql-app-development bash -c "bunx prisma migrate dev --name $1" && reset 