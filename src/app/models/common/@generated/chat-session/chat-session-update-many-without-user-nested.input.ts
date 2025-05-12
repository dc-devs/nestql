import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionCreateWithoutUserInput } from './chat-session-create-without-user.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateOrConnectWithoutUserInput } from './chat-session-create-or-connect-without-user.input';
import { ChatSessionUpsertWithWhereUniqueWithoutUserInput } from './chat-session-upsert-with-where-unique-without-user.input';
import { ChatSessionCreateManyUserInputEnvelope } from './chat-session-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { ChatSessionUpdateWithWhereUniqueWithoutUserInput } from './chat-session-update-with-where-unique-without-user.input';
import { ChatSessionUpdateManyWithWhereWithoutUserInput } from './chat-session-update-many-with-where-without-user.input';
import { ChatSessionScalarWhereInput } from './chat-session-scalar-where.input';

@InputType()
export class ChatSessionUpdateManyWithoutUserNestedInput {

    @Field(() => [ChatSessionCreateWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionCreateWithoutUserInput)
    create?: Array<ChatSessionCreateWithoutUserInput>;

    @Field(() => [ChatSessionCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;

    @Field(() => [ChatSessionUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ChatSessionUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => ChatSessionCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ChatSessionCreateManyUserInputEnvelope)
    createMany?: ChatSessionCreateManyUserInputEnvelope;

    @Field(() => [ChatSessionWhereUniqueInput], {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;

    @Field(() => [ChatSessionWhereUniqueInput], {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;

    @Field(() => [ChatSessionWhereUniqueInput], {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;

    @Field(() => [ChatSessionWhereUniqueInput], {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;

    @Field(() => [ChatSessionUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ChatSessionUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [ChatSessionUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ChatSessionUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [ChatSessionScalarWhereInput], {nullable:true})
    @Type(() => ChatSessionScalarWhereInput)
    deleteMany?: Array<ChatSessionScalarWhereInput>;
}
