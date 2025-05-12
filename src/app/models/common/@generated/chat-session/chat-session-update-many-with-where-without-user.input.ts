import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionScalarWhereInput } from './chat-session-scalar-where.input';
import { Type } from 'class-transformer';
import { ChatSessionUpdateManyMutationInput } from './chat-session-update-many-mutation.input';

@InputType()
export class ChatSessionUpdateManyWithWhereWithoutUserInput {

    @Field(() => ChatSessionScalarWhereInput, {nullable:false})
    @Type(() => ChatSessionScalarWhereInput)
    where!: ChatSessionScalarWhereInput;

    @Field(() => ChatSessionUpdateManyMutationInput, {nullable:false})
    @Type(() => ChatSessionUpdateManyMutationInput)
    data!: ChatSessionUpdateManyMutationInput;
}
