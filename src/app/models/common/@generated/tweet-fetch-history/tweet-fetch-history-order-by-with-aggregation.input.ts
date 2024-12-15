import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { TweetFetchHistoryCountOrderByAggregateInput } from './tweet-fetch-history-count-order-by-aggregate.input';
import { TweetFetchHistoryAvgOrderByAggregateInput } from './tweet-fetch-history-avg-order-by-aggregate.input';
import { TweetFetchHistoryMaxOrderByAggregateInput } from './tweet-fetch-history-max-order-by-aggregate.input';
import { TweetFetchHistoryMinOrderByAggregateInput } from './tweet-fetch-history-min-order-by-aggregate.input';
import { TweetFetchHistorySumOrderByAggregateInput } from './tweet-fetch-history-sum-order-by-aggregate.input';

@InputType()
export class TweetFetchHistoryOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => TweetFetchHistoryCountOrderByAggregateInput, {nullable:true})
    _count?: TweetFetchHistoryCountOrderByAggregateInput;

    @Field(() => TweetFetchHistoryAvgOrderByAggregateInput, {nullable:true})
    _avg?: TweetFetchHistoryAvgOrderByAggregateInput;

    @Field(() => TweetFetchHistoryMaxOrderByAggregateInput, {nullable:true})
    _max?: TweetFetchHistoryMaxOrderByAggregateInput;

    @Field(() => TweetFetchHistoryMinOrderByAggregateInput, {nullable:true})
    _min?: TweetFetchHistoryMinOrderByAggregateInput;

    @Field(() => TweetFetchHistorySumOrderByAggregateInput, {nullable:true})
    _sum?: TweetFetchHistorySumOrderByAggregateInput;
}
