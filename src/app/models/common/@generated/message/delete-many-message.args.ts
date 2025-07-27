import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MessageWhereInput } from './message-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyMessageArgs {

    @Field(() => MessageWhereInput, {nullable:true})
    @Type(() => MessageWhereInput)
    where?: MessageWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
