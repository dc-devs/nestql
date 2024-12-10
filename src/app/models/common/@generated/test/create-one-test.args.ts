import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestCreateInput } from './test-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneTestArgs {

    @Field(() => TestCreateInput, {nullable:false})
    @Type(() => TestCreateInput)
    data!: TestCreateInput;
}
