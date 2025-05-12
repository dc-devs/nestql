import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionCreateManyInput } from './chat-session-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyChatSessionArgs {

    @Field(() => [ChatSessionCreateManyInput], {nullable:false})
    @Type(() => ChatSessionCreateManyInput)
    data!: Array<ChatSessionCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
