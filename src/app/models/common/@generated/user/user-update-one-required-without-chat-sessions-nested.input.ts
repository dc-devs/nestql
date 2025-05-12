import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutChatSessionsInput } from './user-create-without-chat-sessions.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutChatSessionsInput } from './user-create-or-connect-without-chat-sessions.input';
import { UserUpsertWithoutChatSessionsInput } from './user-upsert-without-chat-sessions.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutChatSessionsInput } from './user-update-to-one-with-where-without-chat-sessions.input';

@InputType()
export class UserUpdateOneRequiredWithoutChatSessionsNestedInput {

    @Field(() => UserCreateWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserCreateWithoutChatSessionsInput)
    create?: UserCreateWithoutChatSessionsInput;

    @Field(() => UserCreateOrConnectWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutChatSessionsInput)
    connectOrCreate?: UserCreateOrConnectWithoutChatSessionsInput;

    @Field(() => UserUpsertWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserUpsertWithoutChatSessionsInput)
    upsert?: UserUpsertWithoutChatSessionsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserUpdateToOneWithWhereWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutChatSessionsInput)
    update?: UserUpdateToOneWithWhereWithoutChatSessionsInput;
}
