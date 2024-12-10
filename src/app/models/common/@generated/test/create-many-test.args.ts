import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TestCreateManyInput } from './test-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyTestArgs {

    @Field(() => [TestCreateManyInput], {nullable:false})
    @Type(() => TestCreateManyInput)
    data!: Array<TestCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
