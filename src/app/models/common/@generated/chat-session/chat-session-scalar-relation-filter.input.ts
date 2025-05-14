import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';

@InputType()
export class ChatSessionScalarRelationFilter {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    is?: ChatSessionWhereInput;

    @Field(() => ChatSessionWhereInput, {nullable:true})
    isNot?: ChatSessionWhereInput;
}
