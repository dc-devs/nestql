import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';
import { Type } from 'class-transformer';
import { ChatSessionUpdateWithoutMessagesInput } from './chat-session-update-without-messages.input';

@InputType()
export class ChatSessionUpdateToOneWithWhereWithoutMessagesInput {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;

    @Field(() => ChatSessionUpdateWithoutMessagesInput, {nullable:false})
    @Type(() => ChatSessionUpdateWithoutMessagesInput)
    data!: ChatSessionUpdateWithoutMessagesInput;
}
