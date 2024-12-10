import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestWhereInput } from './test-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyTestArgs {

    @Field(() => TestWhereInput, {nullable:true})
    @Type(() => TestWhereInput)
    where?: TestWhereInput;
}
