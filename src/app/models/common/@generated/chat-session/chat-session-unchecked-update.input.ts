import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MessageUncheckedUpdateManyWithoutChatSessionNestedInput } from '../message/message-unchecked-update-many-without-chat-session-nested.input';

@InputType()
export class ChatSessionUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => MessageUncheckedUpdateManyWithoutChatSessionNestedInput, {nullable:true})
    messages?: MessageUncheckedUpdateManyWithoutChatSessionNestedInput;
}
