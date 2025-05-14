import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutChatSessionInput } from './message-create-without-chat-session.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutChatSessionInput } from './message-create-or-connect-without-chat-session.input';
import { MessageUpsertWithWhereUniqueWithoutChatSessionInput } from './message-upsert-with-where-unique-without-chat-session.input';
import { MessageCreateManyChatSessionInputEnvelope } from './message-create-many-chat-session-input-envelope.input';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { MessageUpdateWithWhereUniqueWithoutChatSessionInput } from './message-update-with-where-unique-without-chat-session.input';
import { MessageUpdateManyWithWhereWithoutChatSessionInput } from './message-update-many-with-where-without-chat-session.input';
import { MessageScalarWhereInput } from './message-scalar-where.input';

@InputType()
export class MessageUpdateManyWithoutChatSessionNestedInput {

    @Field(() => [MessageCreateWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageCreateWithoutChatSessionInput)
    create?: Array<MessageCreateWithoutChatSessionInput>;

    @Field(() => [MessageCreateOrConnectWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutChatSessionInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;

    @Field(() => [MessageUpsertWithWhereUniqueWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageUpsertWithWhereUniqueWithoutChatSessionInput)
    upsert?: Array<MessageUpsertWithWhereUniqueWithoutChatSessionInput>;

    @Field(() => MessageCreateManyChatSessionInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManyChatSessionInputEnvelope)
    createMany?: MessageCreateManyChatSessionInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageUpdateWithWhereUniqueWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageUpdateWithWhereUniqueWithoutChatSessionInput)
    update?: Array<MessageUpdateWithWhereUniqueWithoutChatSessionInput>;

    @Field(() => [MessageUpdateManyWithWhereWithoutChatSessionInput], {nullable:true})
    @Type(() => MessageUpdateManyWithWhereWithoutChatSessionInput)
    updateMany?: Array<MessageUpdateManyWithWhereWithoutChatSessionInput>;

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    @Type(() => MessageScalarWhereInput)
    deleteMany?: Array<MessageScalarWhereInput>;
}
