import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestUpdateInput } from './test-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { TestWhereUniqueInput } from './test-where-unique.input';

@ArgsType()
export class UpdateOneTestArgs {

    @Field(() => TestUpdateInput, {nullable:false})
    @Type(() => TestUpdateInput)
    data!: TestUpdateInput;

    @Field(() => TestWhereUniqueInput, {nullable:false})
    @Type(() => TestWhereUniqueInput)
    where!: Prisma.AtLeast<TestWhereUniqueInput, 'id'>;
}
