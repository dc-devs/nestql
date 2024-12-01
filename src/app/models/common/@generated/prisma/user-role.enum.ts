import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}


registerEnumType(UserRole, { name: 'UserRole', description: undefined })
