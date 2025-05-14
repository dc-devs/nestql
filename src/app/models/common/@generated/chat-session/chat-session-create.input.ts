import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutChatSessionsInput } from '../user/user-create-nested-one-without-chat-sessions.input';
import { MessageCreateNestedManyWithoutChatSessionInput } from '../message/message-create-nested-many-without-chat-session.input';

@InputType()
export class ChatSessionCreateInput {

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutChatSessionsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutChatSessionsInput;

    @Field(() => MessageCreateNestedManyWithoutChatSessionInput, {nullable:true})
    messages?: MessageCreateNestedManyWithoutChatSessionInput;
}
