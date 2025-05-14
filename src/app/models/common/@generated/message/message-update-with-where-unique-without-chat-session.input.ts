import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageUpdateWithoutChatSessionInput } from './message-update-without-chat-session.input';

@InputType()
export class MessageUpdateWithWhereUniqueWithoutChatSessionInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;

    @Field(() => MessageUpdateWithoutChatSessionInput, {nullable:false})
    @Type(() => MessageUpdateWithoutChatSessionInput)
    data!: MessageUpdateWithoutChatSessionInput;
}
