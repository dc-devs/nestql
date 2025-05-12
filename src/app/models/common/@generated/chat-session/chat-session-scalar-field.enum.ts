import { registerEnumType } from '@nestjs/graphql';

export enum ChatSessionScalarFieldEnum {
    id = "id",
    userId = "userId",
    title = "title",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(ChatSessionScalarFieldEnum, { name: 'ChatSessionScalarFieldEnum', description: undefined })
