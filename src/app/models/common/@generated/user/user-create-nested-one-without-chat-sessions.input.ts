import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutChatSessionsInput } from './user-create-without-chat-sessions.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutChatSessionsInput } from './user-create-or-connect-without-chat-sessions.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutChatSessionsInput {

    @Field(() => UserCreateWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserCreateWithoutChatSessionsInput)
    create?: UserCreateWithoutChatSessionsInput;

    @Field(() => UserCreateOrConnectWithoutChatSessionsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutChatSessionsInput)
    connectOrCreate?: UserCreateOrConnectWithoutChatSessionsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
