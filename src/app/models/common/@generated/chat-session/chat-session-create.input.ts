import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutChatSessionsInput } from '../user/user-create-nested-one-without-chat-sessions.input';
import { MessageCreateNestedManyWithoutSessionInput } from '../message/message-create-nested-many-without-session.input';

@InputType()
export class ChatSessionCreateInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutChatSessionsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutChatSessionsInput;

    @Field(() => MessageCreateNestedManyWithoutSessionInput, {nullable:true})
    messages?: MessageCreateNestedManyWithoutSessionInput;
}
