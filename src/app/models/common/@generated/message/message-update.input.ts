import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ChatSessionUpdateOneRequiredWithoutMessagesNestedInput } from '../chat-session/chat-session-update-one-required-without-messages-nested.input';

@InputType()
export class MessageUpdateInput {

    @Field(() => String, {nullable:true})
    sender?: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:true})
    content?: string;

    @Field(() => GraphQLJSON, {nullable:true})
    payload?: any;

    @Field(() => Date, {nullable:true})
    timestamp?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => ChatSessionUpdateOneRequiredWithoutMessagesNestedInput, {nullable:true})
    chatSession?: ChatSessionUpdateOneRequiredWithoutMessagesNestedInput;
}
