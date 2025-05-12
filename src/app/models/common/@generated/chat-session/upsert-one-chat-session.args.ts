import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateInput } from './chat-session-create.input';
import { ChatSessionUpdateInput } from './chat-session-update.input';

@ArgsType()
export class UpsertOneChatSessionArgs {

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => ChatSessionCreateInput, {nullable:false})
    @Type(() => ChatSessionCreateInput)
    create!: ChatSessionCreateInput;

    @Field(() => ChatSessionUpdateInput, {nullable:false})
    @Type(() => ChatSessionUpdateInput)
    update!: ChatSessionUpdateInput;
}
