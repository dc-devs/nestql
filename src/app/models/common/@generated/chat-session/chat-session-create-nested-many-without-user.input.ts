import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionCreateWithoutUserInput } from './chat-session-create-without-user.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateOrConnectWithoutUserInput } from './chat-session-create-or-connect-without-user.input';
import { ChatSessionCreateManyUserInputEnvelope } from './chat-session-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';

@InputType()
export class ChatSessionCreateNestedManyWithoutUserInput {

    @Field(() => [ChatSessionCreateWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionCreateWithoutUserInput)
    create?: Array<ChatSessionCreateWithoutUserInput>;

    @Field(() => [ChatSessionCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ChatSessionCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;

    @Field(() => ChatSessionCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ChatSessionCreateManyUserInputEnvelope)
    createMany?: ChatSessionCreateManyUserInputEnvelope;

    @Field(() => [ChatSessionWhereUniqueInput], {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
}
