import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { MessageCountOrderByAggregateInput } from './message-count-order-by-aggregate.input';
import { MessageAvgOrderByAggregateInput } from './message-avg-order-by-aggregate.input';
import { MessageMaxOrderByAggregateInput } from './message-max-order-by-aggregate.input';
import { MessageMinOrderByAggregateInput } from './message-min-order-by-aggregate.input';
import { MessageSumOrderByAggregateInput } from './message-sum-order-by-aggregate.input';

@InputType()
export class MessageOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    sender?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    content?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    payload?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    timestamp?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    chatSessionId?: `${SortOrder}`;

    @Field(() => MessageCountOrderByAggregateInput, {nullable:true})
    _count?: MessageCountOrderByAggregateInput;

    @Field(() => MessageAvgOrderByAggregateInput, {nullable:true})
    _avg?: MessageAvgOrderByAggregateInput;

    @Field(() => MessageMaxOrderByAggregateInput, {nullable:true})
    _max?: MessageMaxOrderByAggregateInput;

    @Field(() => MessageMinOrderByAggregateInput, {nullable:true})
    _min?: MessageMinOrderByAggregateInput;

    @Field(() => MessageSumOrderByAggregateInput, {nullable:true})
    _sum?: MessageSumOrderByAggregateInput;
}
