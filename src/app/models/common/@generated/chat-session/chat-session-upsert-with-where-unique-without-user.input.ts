import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Type } from 'class-transformer';
import { ChatSessionUpdateWithoutUserInput } from './chat-session-update-without-user.input';
import { ChatSessionCreateWithoutUserInput } from './chat-session-create-without-user.input';

@InputType()
export class ChatSessionUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => ChatSessionUpdateWithoutUserInput, {nullable:false})
    @Type(() => ChatSessionUpdateWithoutUserInput)
    update!: ChatSessionUpdateWithoutUserInput;

    @Field(() => ChatSessionCreateWithoutUserInput, {nullable:false})
    @Type(() => ChatSessionCreateWithoutUserInput)
    create!: ChatSessionCreateWithoutUserInput;
}
