import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ChatSession } from '../chat-session/chat-session.model';

@ObjectType()
export class Message {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    sessionId!: number;

    @Field(() => String, {nullable:false})
    sender!: string;

    @Field(() => String, {nullable:false,defaultValue:'text'})
    type!: string;

    @Field(() => String, {nullable:true})
    content!: string | null;

    @Field(() => GraphQLJSON, {nullable:true})
    payload!: any | null;

    @Field(() => Date, {nullable:false})
    timestamp!: Date;

    @Field(() => ChatSession, {nullable:false})
    session?: ChatSession & {};
}
