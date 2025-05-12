import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MessageUncheckedUpdateManyWithoutSessionNestedInput } from '../message/message-unchecked-update-many-without-session-nested.input';

@InputType()
export class ChatSessionUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => MessageUncheckedUpdateManyWithoutSessionNestedInput, {nullable:true})
    messages?: MessageUncheckedUpdateManyWithoutSessionNestedInput;
}
