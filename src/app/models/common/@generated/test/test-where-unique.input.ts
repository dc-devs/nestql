import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TestWhereInput } from './test-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { Type } from 'class-transformer';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TestWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [TestWhereInput], {nullable:true})
    AND?: Array<TestWhereInput>;

    @Field(() => [TestWhereInput], {nullable:true})
    OR?: Array<TestWhereInput>;

    @Field(() => [TestWhereInput], {nullable:true})
    NOT?: Array<TestWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    @Type(() => StringFilter)
    update?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
