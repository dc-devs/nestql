import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChatSessionCreateWithoutMessagesInput } from './chat-session-create-without-messages.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateOrConnectWithoutMessagesInput } from './chat-session-create-or-connect-without-messages.input';
import { ChatSessionUpsertWithoutMessagesInput } from './chat-session-upsert-without-messages.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { ChatSessionUpdateToOneWithWhereWithoutMessagesInput } from './chat-session-update-to-one-with-where-without-messages.input';

@InputType()
export class ChatSessionUpdateOneRequiredWithoutMessagesNestedInput {

    @Field(() => ChatSessionCreateWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionCreateWithoutMessagesInput)
    create?: ChatSessionCreateWithoutMessagesInput;

    @Field(() => ChatSessionCreateOrConnectWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionCreateOrConnectWithoutMessagesInput)
    connectOrCreate?: ChatSessionCreateOrConnectWithoutMessagesInput;

    @Field(() => ChatSessionUpsertWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionUpsertWithoutMessagesInput)
    upsert?: ChatSessionUpsertWithoutMessagesInput;

    @Field(() => ChatSessionWhereUniqueInput, {nullable:true})
    @Type(() => ChatSessionWhereUniqueInput)
    connect?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => ChatSessionUpdateToOneWithWhereWithoutMessagesInput, {nullable:true})
    @Type(() => ChatSessionUpdateToOneWithWhereWithoutMessagesInput)
    update?: ChatSessionUpdateToOneWithWhereWithoutMessagesInput;
}
