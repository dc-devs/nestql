import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TestWhereUniqueInput } from './test-where-unique.input';
import { Type } from 'class-transformer';
import { TestCreateInput } from './test-create.input';
import { TestUpdateInput } from './test-update.input';

@ArgsType()
export class UpsertOneTestArgs {

    @Field(() => TestWhereUniqueInput, {nullable:false})
    @Type(() => TestWhereUniqueInput)
    where!: Prisma.AtLeast<TestWhereUniqueInput, 'id'>;

    @Field(() => TestCreateInput, {nullable:false})
    @Type(() => TestCreateInput)
    create!: TestCreateInput;

    @Field(() => TestUpdateInput, {nullable:false})
    @Type(() => TestUpdateInput)
    update!: TestUpdateInput;
}
