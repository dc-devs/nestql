import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutChatSessionsNestedInput } from '../user/user-update-one-required-without-chat-sessions-nested.input';
import { MessageUpdateManyWithoutChatSessionNestedInput } from '../message/message-update-many-without-chat-session-nested.input';

@InputType()
export class ChatSessionUpdateInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserUpdateOneRequiredWithoutChatSessionsNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutChatSessionsNestedInput;

    @Field(() => MessageUpdateManyWithoutChatSessionNestedInput, {nullable:true})
    messages?: MessageUpdateManyWithoutChatSessionNestedInput;
}
