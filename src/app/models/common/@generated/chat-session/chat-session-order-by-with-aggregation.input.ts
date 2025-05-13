import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ChatSessionCountOrderByAggregateInput } from './chat-session-count-order-by-aggregate.input';
import { ChatSessionAvgOrderByAggregateInput } from './chat-session-avg-order-by-aggregate.input';
import { ChatSessionMaxOrderByAggregateInput } from './chat-session-max-order-by-aggregate.input';
import { ChatSessionMinOrderByAggregateInput } from './chat-session-min-order-by-aggregate.input';
import { ChatSessionSumOrderByAggregateInput } from './chat-session-sum-order-by-aggregate.input';

@InputType()
export class ChatSessionOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    title?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;

    @Field(() => ChatSessionCountOrderByAggregateInput, {nullable:true})
    _count?: ChatSessionCountOrderByAggregateInput;

    @Field(() => ChatSessionAvgOrderByAggregateInput, {nullable:true})
    _avg?: ChatSessionAvgOrderByAggregateInput;

    @Field(() => ChatSessionMaxOrderByAggregateInput, {nullable:true})
    _max?: ChatSessionMaxOrderByAggregateInput;

    @Field(() => ChatSessionMinOrderByAggregateInput, {nullable:true})
    _min?: ChatSessionMinOrderByAggregateInput;

    @Field(() => ChatSessionSumOrderByAggregateInput, {nullable:true})
    _sum?: ChatSessionSumOrderByAggregateInput;
}
