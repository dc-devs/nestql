import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionUpdateManyMutationInput } from './chat-session-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ChatSessionWhereInput } from './chat-session-where.input';

@ArgsType()
export class UpdateManyChatSessionArgs {

    @Field(() => ChatSessionUpdateManyMutationInput, {nullable:false})
    @Type(() => ChatSessionUpdateManyMutationInput)
    data!: ChatSessionUpdateManyMutationInput;

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;
}
