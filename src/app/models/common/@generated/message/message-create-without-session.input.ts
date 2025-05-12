import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class MessageCreateWithoutSessionInput {

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
}
