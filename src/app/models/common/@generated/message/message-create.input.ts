import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ChatSessionCreateNestedOneWithoutMessagesInput } from '../chat-session/chat-session-create-nested-one-without-messages.input';

@InputType()
export class MessageCreateInput {

    @Field(() => String, {nullable:false})
    sender!: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:true})
    content?: string;

    @Field(() => GraphQLJSON, {nullable:true})
    payload?: any;

    @Field(() => Date, {nullable:true})
    timestamp?: Date | string;

    @Field(() => ChatSessionCreateNestedOneWithoutMessagesInput, {nullable:false})
    session!: ChatSessionCreateNestedOneWithoutMessagesInput;
}
