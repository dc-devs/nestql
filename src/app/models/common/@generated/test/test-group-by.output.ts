import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TestCountAggregate } from './test-count-aggregate.output';
import { TestAvgAggregate } from './test-avg-aggregate.output';
import { TestSumAggregate } from './test-sum-aggregate.output';
import { TestMinAggregate } from './test-min-aggregate.output';
import { TestMaxAggregate } from './test-max-aggregate.output';

@ObjectType()
export class TestGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    update!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => TestCountAggregate, {nullable:true})
    _count?: TestCountAggregate;

    @Field(() => TestAvgAggregate, {nullable:true})
    _avg?: TestAvgAggregate;

    @Field(() => TestSumAggregate, {nullable:true})
    _sum?: TestSumAggregate;

    @Field(() => TestMinAggregate, {nullable:true})
    _min?: TestMinAggregate;

    @Field(() => TestMaxAggregate, {nullable:true})
    _max?: TestMaxAggregate;
}
