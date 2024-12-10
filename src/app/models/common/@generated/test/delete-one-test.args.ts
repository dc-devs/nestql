import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TestWhereUniqueInput } from './test-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneTestArgs {

    @Field(() => TestWhereUniqueInput, {nullable:false})
    @Type(() => TestWhereUniqueInput)
    where!: Prisma.AtLeast<TestWhereUniqueInput, 'id'>;
}
