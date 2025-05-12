import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionCreateInput } from './chat-session-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneChatSessionArgs {

    @Field(() => ChatSessionCreateInput, {nullable:false})
    @Type(() => ChatSessionCreateInput)
    data!: ChatSessionCreateInput;
}
