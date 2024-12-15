import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryWhereInput } from './tweet-fetch-history-where.input';
import { Type } from 'class-transformer';
import { TweetFetchHistoryOrderByWithRelationInput } from './tweet-fetch-history-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TweetFetchHistoryWhereUniqueInput } from './tweet-fetch-history-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TweetFetchHistoryCountAggregateInput } from './tweet-fetch-history-count-aggregate.input';
import { TweetFetchHistoryAvgAggregateInput } from './tweet-fetch-history-avg-aggregate.input';
import { TweetFetchHistorySumAggregateInput } from './tweet-fetch-history-sum-aggregate.input';
import { TweetFetchHistoryMinAggregateInput } from './tweet-fetch-history-min-aggregate.input';
import { TweetFetchHistoryMaxAggregateInput } from './tweet-fetch-history-max-aggregate.input';

@ArgsType()
export class TweetFetchHistoryAggregateArgs {

    @Field(() => TweetFetchHistoryWhereInput, {nullable:true})
    @Type(() => TweetFetchHistoryWhereInput)
    where?: TweetFetchHistoryWhereInput;

    @Field(() => [TweetFetchHistoryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TweetFetchHistoryOrderByWithRelationInput>;

    @Field(() => TweetFetchHistoryWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<TweetFetchHistoryWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => TweetFetchHistoryCountAggregateInput, {nullable:true})
    _count?: TweetFetchHistoryCountAggregateInput;

    @Field(() => TweetFetchHistoryAvgAggregateInput, {nullable:true})
    _avg?: TweetFetchHistoryAvgAggregateInput;

    @Field(() => TweetFetchHistorySumAggregateInput, {nullable:true})
    _sum?: TweetFetchHistorySumAggregateInput;

    @Field(() => TweetFetchHistoryMinAggregateInput, {nullable:true})
    _min?: TweetFetchHistoryMinAggregateInput;

    @Field(() => TweetFetchHistoryMaxAggregateInput, {nullable:true})
    _max?: TweetFetchHistoryMaxAggregateInput;
}
