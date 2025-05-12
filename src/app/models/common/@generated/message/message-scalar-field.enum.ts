import { registerEnumType } from '@nestjs/graphql';

export enum MessageScalarFieldEnum {
    id = "id",
    sessionId = "sessionId",
    sender = "sender",
    type = "type",
    content = "content",
    payload = "payload",
    timestamp = "timestamp"
}


registerEnumType(MessageScalarFieldEnum, { name: 'MessageScalarFieldEnum', description: undefined })
