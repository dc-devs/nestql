import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionUpdateWithoutMessagesInput } from './chat-session-update-without-messages.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateWithoutMessagesInput } from './chat-session-create-without-messages.input';
import { ChatSessionWhereInput } from './chat-session-where.input';

@InputType()
export class ChatSessionUpsertWithoutMessagesInput {

    @Field(() => ChatSessionUpdateWithoutMessagesInput, {nullable:false})
    @Type(() => ChatSessionUpdateWithoutMessagesInput)
    update!: ChatSessionUpdateWithoutMessagesInput;

    @Field(() => ChatSessionCreateWithoutMessagesInput, {nullable:false})
    @Type(() => ChatSessionCreateWithoutMessagesInput)
    create!: ChatSessionCreateWithoutMessagesInput;

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;
}
