import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionCreateManyUserInput } from './chat-session-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class ChatSessionCreateManyUserInputEnvelope {

    @Field(() => [ChatSessionCreateManyUserInput], {nullable:false})
    @Type(() => ChatSessionCreateManyUserInput)
    data!: Array<ChatSessionCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
