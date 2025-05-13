import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';

@InputType()
export class ChatSessionListRelationFilter {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    every?: ChatSessionWhereInput & {};

    @Field(() => ChatSessionWhereInput, {nullable:true})
    some?: ChatSessionWhereInput & {};

    @Field(() => ChatSessionWhereInput, {nullable:true})
    none?: ChatSessionWhereInput & {};
}
