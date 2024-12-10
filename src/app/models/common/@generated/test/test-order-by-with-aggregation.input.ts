import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { TestCountOrderByAggregateInput } from './test-count-order-by-aggregate.input';
import { TestAvgOrderByAggregateInput } from './test-avg-order-by-aggregate.input';
import { TestMaxOrderByAggregateInput } from './test-max-order-by-aggregate.input';
import { TestMinOrderByAggregateInput } from './test-min-order-by-aggregate.input';
import { TestSumOrderByAggregateInput } from './test-sum-order-by-aggregate.input';

@InputType()
export class TestOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    update?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => TestCountOrderByAggregateInput, {nullable:true})
    _count?: TestCountOrderByAggregateInput;

    @Field(() => TestAvgOrderByAggregateInput, {nullable:true})
    _avg?: TestAvgOrderByAggregateInput;

    @Field(() => TestMaxOrderByAggregateInput, {nullable:true})
    _max?: TestMaxOrderByAggregateInput;

    @Field(() => TestMinOrderByAggregateInput, {nullable:true})
    _min?: TestMinOrderByAggregateInput;

    @Field(() => TestSumOrderByAggregateInput, {nullable:true})
    _sum?: TestSumOrderByAggregateInput;
}
