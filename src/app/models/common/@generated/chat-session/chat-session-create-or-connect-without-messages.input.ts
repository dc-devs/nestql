import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateWithoutMessagesInput } from './chat-session-create-without-messages.input';

@InputType()
export class ChatSessionCreateOrConnectWithoutMessagesInput {

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => ChatSessionCreateWithoutMessagesInput, {nullable:false})
    @Type(() => ChatSessionCreateWithoutMessagesInput)
    create!: ChatSessionCreateWithoutMessagesInput;
}
