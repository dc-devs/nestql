import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ChatSessionCount {

    @Field(() => Int, {nullable:false})
    messages?: number;
}
