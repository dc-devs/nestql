import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueChatSessionArgs {

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
