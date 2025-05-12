import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionCreateWithoutMessagesInput } from './chat-session-create-without-messages.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateOrConnectWithoutMessagesInput } from './chat-session-create-or-connect-without-messages.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';

@InputType()
export class ChatSessionCreateNestedOneWithoutMessagesInput {

    @Field(() => ChatSessionCreateWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionCreateWithoutMessagesInput)
    create?: ChatSessionCreateWithoutMessagesInput;

    @Field(() => ChatSessionCreateOrConnectWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionCreateOrConnectWithoutMessagesInput)
    connectOrCreate?: ChatSessionCreateOrConnectWithoutMessagesInput;

    @Field(() => ChatSessionWhereUniqueInput, {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    connect?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
