import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionUpdateInput } from './chat-session-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';

@ArgsType()
export class UpdateOneChatSessionArgs {

    @Field(() => ChatSessionUpdateInput, {nullable:false})
    @Type(() => ChatSessionUpdateInput)
    data!: ChatSessionUpdateInput;

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
