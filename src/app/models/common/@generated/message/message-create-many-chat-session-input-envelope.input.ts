import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateManyChatSessionInput } from './message-create-many-chat-session.input';
import { Type } from 'class-transformer';

@InputType()
export class MessageCreateManyChatSessionInputEnvelope {

    @Field(() => [MessageCreateManyChatSessionInput], {nullable:false})
    @Type(() => MessageCreateManyChatSessionInput)
    data!: Array<MessageCreateManyChatSessionInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
