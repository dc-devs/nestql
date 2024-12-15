import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TweetFetchHistoryCountAggregate } from './tweet-fetch-history-count-aggregate.output';
import { TweetFetchHistoryAvgAggregate } from './tweet-fetch-history-avg-aggregate.output';
import { TweetFetchHistorySumAggregate } from './tweet-fetch-history-sum-aggregate.output';
import { TweetFetchHistoryMinAggregate } from './tweet-fetch-history-min-aggregate.output';
import { TweetFetchHistoryMaxAggregate } from './tweet-fetch-history-max-aggregate.output';

@ObjectType()
export class TweetFetchHistoryGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => TweetFetchHistoryCountAggregate, {nullable:true})
    _count?: TweetFetchHistoryCountAggregate;

    @Field(() => TweetFetchHistoryAvgAggregate, {nullable:true})
    _avg?: TweetFetchHistoryAvgAggregate;

    @Field(() => TweetFetchHistorySumAggregate, {nullable:true})
    _sum?: TweetFetchHistorySumAggregate;

    @Field(() => TweetFetchHistoryMinAggregate, {nullable:true})
    _min?: TweetFetchHistoryMinAggregate;

    @Field(() => TweetFetchHistoryMaxAggregate, {nullable:true})
    _max?: TweetFetchHistoryMaxAggregate;
}
