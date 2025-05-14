import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Int } from '@nestjs/graphql';
import { ChatSession } from '../chat-session/chat-session.model';

@ObjectType()
export class Message {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    sender!: string;

    @Field(() => String, {defaultValue:'text',nullable:false})
    type!: string;

    @Field(() => String, {nullable:true})
    content!: string | null;

    @Field(() => GraphQLJSON, {nullable:true})
    payload!: any | null;

    @Field(() => Date, {nullable:false})
    timestamp!: Date;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Int, {nullable:false})
    chatSessionId!: number;

    @Field(() => ChatSession, {nullable:false})
    chatSession?: ChatSession & {};
}
