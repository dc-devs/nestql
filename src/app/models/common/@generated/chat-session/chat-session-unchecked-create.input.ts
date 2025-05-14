import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MessageUncheckedCreateNestedManyWithoutChatSessionInput } from '../message/message-unchecked-create-nested-many-without-chat-session.input';

@InputType()
export class ChatSessionUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => MessageUncheckedCreateNestedManyWithoutChatSessionInput, {nullable:true})
    messages?: MessageUncheckedCreateNestedManyWithoutChatSessionInput;
}
