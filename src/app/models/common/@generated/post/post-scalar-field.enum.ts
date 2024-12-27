import { registerEnumType } from '@nestjs/graphql';

export enum PostScalarFieldEnum {
    id = "id",
    title = "title",
    content = "content",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PostScalarFieldEnum, { name: 'PostScalarFieldEnum', description: undefined })
