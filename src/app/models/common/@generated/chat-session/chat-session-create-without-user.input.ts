import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateNestedManyWithoutSessionInput } from '../message/message-create-nested-many-without-session.input';

@InputType()
export class ChatSessionCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => MessageCreateNestedManyWithoutSessionInput, {nullable:true})
    messages?: MessageCreateNestedManyWithoutSessionInput;
}
