import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageUpdateManyWithoutSessionNestedInput } from '../message/message-update-many-without-session-nested.input';

@InputType()
export class ChatSessionUpdateWithoutUserInput {

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => MessageUpdateManyWithoutSessionNestedInput, {nullable:true})
    messages?: MessageUpdateManyWithoutSessionNestedInput;
}
