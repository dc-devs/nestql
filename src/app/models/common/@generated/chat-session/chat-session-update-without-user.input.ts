import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageUpdateManyWithoutChatSessionNestedInput } from '../message/message-update-many-without-chat-session-nested.input';

@InputType()
export class ChatSessionUpdateWithoutUserInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => MessageUpdateManyWithoutChatSessionNestedInput, {nullable:true})
    messages?: MessageUpdateManyWithoutChatSessionNestedInput;
}
