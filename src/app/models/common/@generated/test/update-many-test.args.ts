import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestUpdateManyMutationInput } from './test-update-many-mutation.input';
import { Type } from 'class-transformer';
import { TestWhereInput } from './test-where.input';

@ArgsType()
export class UpdateManyTestArgs {

    @Field(() => TestUpdateManyMutationInput, {nullable:false})
    @Type(() => TestUpdateManyMutationInput)
    data!: TestUpdateManyMutationInput;

    @Field(() => TestWhereInput, {nullable:true})
    @Type(() => TestWhereInput)
    where?: TestWhereInput;
}
