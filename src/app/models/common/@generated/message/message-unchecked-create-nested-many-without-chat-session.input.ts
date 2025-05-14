import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutChatSessionInput } from './message-create-without-chat-session.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutChatSessionInput } from './message-create-or-connect-without-chat-session.input';
import { MessageCreateManyChatSessionInputEnvelope } from './message-create-many-chat-session-input-envelope.input';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';

@InputType()
export class MessageUncheckedCreateNestedManyWithoutChatSessionInput {

    @Field(() => [MessageCreateWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageCreateWithoutChatSessionInput)
    create?: Array<MessageCreateWithoutChatSessionInput>;

    @Field(() => [MessageCreateOrConnectWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutChatSessionInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;

    @Field(() => MessageCreateManyChatSessionInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManyChatSessionInputEnvelope)
    createMany?: MessageCreateManyChatSessionInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
}
