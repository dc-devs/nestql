import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageCreateWithoutChatSessionInput } from './message-create-without-chat-session.input';

@InputType()
export class MessageCreateOrConnectWithoutChatSessionInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;

    @Field(() => MessageCreateWithoutChatSessionInput, {nullable:false})
    @Type(() => MessageCreateWithoutChatSessionInput)
    create!: MessageCreateWithoutChatSessionInput;
}
