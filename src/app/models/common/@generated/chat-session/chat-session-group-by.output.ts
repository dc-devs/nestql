import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ChatSessionCountAggregate } from './chat-session-count-aggregate.output';
import { ChatSessionAvgAggregate } from './chat-session-avg-aggregate.output';
import { ChatSessionSumAggregate } from './chat-session-sum-aggregate.output';
import { ChatSessionMinAggregate } from './chat-session-min-aggregate.output';
import { ChatSessionMaxAggregate } from './chat-session-max-aggregate.output';

@ObjectType()
export class ChatSessionGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => ChatSessionCountAggregate, {nullable:true})
    _count?: ChatSessionCountAggregate;

    @Field(() => ChatSessionAvgAggregate, {nullable:true})
    _avg?: ChatSessionAvgAggregate;

    @Field(() => ChatSessionSumAggregate, {nullable:true})
    _sum?: ChatSessionSumAggregate;

    @Field(() => ChatSessionMinAggregate, {nullable:true})
    _min?: ChatSessionMinAggregate;

    @Field(() => ChatSessionMaxAggregate, {nullable:true})
    _max?: ChatSessionMaxAggregate;
}
