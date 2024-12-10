import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestWhereInput } from './test-where.input';
import { Type } from 'class-transformer';
import { TestOrderByWithRelationInput } from './test-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TestWhereUniqueInput } from './test-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TestCountAggregateInput } from './test-count-aggregate.input';
import { TestAvgAggregateInput } from './test-avg-aggregate.input';
import { TestSumAggregateInput } from './test-sum-aggregate.input';
import { TestMinAggregateInput } from './test-min-aggregate.input';
import { TestMaxAggregateInput } from './test-max-aggregate.input';

@ArgsType()
export class TestAggregateArgs {

    @Field(() => TestWhereInput, {nullable:true})
    @Type(() => TestWhereInput)
    where?: TestWhereInput;

    @Field(() => [TestOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TestOrderByWithRelationInput>;

    @Field(() => TestWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<TestWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => TestCountAggregateInput, {nullable:true})
    _count?: TestCountAggregateInput;

    @Field(() => TestAvgAggregateInput, {nullable:true})
    _avg?: TestAvgAggregateInput;

    @Field(() => TestSumAggregateInput, {nullable:true})
    _sum?: TestSumAggregateInput;

    @Field(() => TestMinAggregateInput, {nullable:true})
    _min?: TestMinAggregateInput;

    @Field(() => TestMaxAggregateInput, {nullable:true})
    _max?: TestMaxAggregateInput;
}
