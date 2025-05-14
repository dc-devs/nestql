import { registerEnumType } from '@nestjs/graphql';

export enum MessageScalarFieldEnum {
    id = "id",
    sender = "sender",
    type = "type",
    content = "content",
    payload = "payload",
    timestamp = "timestamp",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    chatSessionId = "chatSessionId"
}


registerEnumType(MessageScalarFieldEnum, { name: 'MessageScalarFieldEnum', description: undefined })
