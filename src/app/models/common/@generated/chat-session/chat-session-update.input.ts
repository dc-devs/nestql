import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutChatSessionsNestedInput } from '../user/user-update-one-required-without-chat-sessions-nested.input';

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
}
