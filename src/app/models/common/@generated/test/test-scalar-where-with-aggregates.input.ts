import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { Type } from 'class-transformer';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class TestScalarWhereWithAggregatesInput {

    @Field(() => [TestScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<TestScalarWhereWithAggregatesInput>;

    @Field(() => [TestScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<TestScalarWhereWithAggregatesInput>;

    @Field(() => [TestScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<TestScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    @Type(() => StringWithAggregatesFilter)
    update?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;
}
