import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateNestedManyWithoutChatSessionInput } from '../message/message-create-nested-many-without-chat-session.input';

@InputType()
export class ChatSessionCreateWithoutUserInput {

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => MessageCreateNestedManyWithoutChatSessionInput, {nullable:true})
    messages?: MessageCreateNestedManyWithoutChatSessionInput;
}
