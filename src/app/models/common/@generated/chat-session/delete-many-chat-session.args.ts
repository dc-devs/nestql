import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyChatSessionArgs {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;
}
