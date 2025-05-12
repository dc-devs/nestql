import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';
import { Type } from 'class-transformer';
import { ChatSessionOrderByWithRelationInput } from './chat-session-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ChatSessionCountAggregateInput } from './chat-session-count-aggregate.input';
import { ChatSessionAvgAggregateInput } from './chat-session-avg-aggregate.input';
import { ChatSessionSumAggregateInput } from './chat-session-sum-aggregate.input';
import { ChatSessionMinAggregateInput } from './chat-session-min-aggregate.input';
import { ChatSessionMaxAggregateInput } from './chat-session-max-aggregate.input';

@ArgsType()
export class ChatSessionAggregateArgs {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;

    @Field(() => [ChatSessionOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;

    @Field(() => ChatSessionWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ChatSessionCountAggregateInput, {nullable:true})
    _count?: ChatSessionCountAggregateInput;

    @Field(() => ChatSessionAvgAggregateInput, {nullable:true})
    _avg?: ChatSessionAvgAggregateInput;

    @Field(() => ChatSessionSumAggregateInput, {nullable:true})
    _sum?: ChatSessionSumAggregateInput;

    @Field(() => ChatSessionMinAggregateInput, {nullable:true})
    _min?: ChatSessionMinAggregateInput;

    @Field(() => ChatSessionMaxAggregateInput, {nullable:true})
    _max?: ChatSessionMaxAggregateInput;
}
