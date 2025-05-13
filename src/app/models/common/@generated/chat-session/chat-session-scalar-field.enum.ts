import { registerEnumType } from '@nestjs/graphql';

export enum ChatSessionScalarFieldEnum {
    id = "id",
    title = "title",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    userId = "userId"
}


registerEnumType(ChatSessionScalarFieldEnum, { name: 'ChatSessionScalarFieldEnum', description: undefined })
