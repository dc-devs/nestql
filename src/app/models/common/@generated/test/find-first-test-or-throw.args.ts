import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestWhereInput } from './test-where.input';
import { Type } from 'class-transformer';
import { TestOrderByWithRelationInput } from './test-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TestWhereUniqueInput } from './test-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TestScalarFieldEnum } from './test-scalar-field.enum';

@ArgsType()
export class FindFirstTestOrThrowArgs {

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

    @Field(() => [TestScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof TestScalarFieldEnum>;
}
