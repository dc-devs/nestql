import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutChatSessionsInput } from '../user/user-create-nested-one-without-chat-sessions.input';

@InputType()
export class ChatSessionCreateWithoutMessagesInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutChatSessionsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutChatSessionsInput;
}
