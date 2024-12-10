import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { Type } from 'class-transformer';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TestWhereInput {

    @Field(() => [TestWhereInput], {nullable:true})
    AND?: Array<TestWhereInput>;

    @Field(() => [TestWhereInput], {nullable:true})
    OR?: Array<TestWhereInput>;

    @Field(() => [TestWhereInput], {nullable:true})
    NOT?: Array<TestWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    @Type(() => StringFilter)
    update?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
