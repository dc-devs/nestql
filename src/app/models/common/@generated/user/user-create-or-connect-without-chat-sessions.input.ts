import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutChatSessionsInput } from './user-create-without-chat-sessions.input';

@InputType()
export class UserCreateOrConnectWithoutChatSessionsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserCreateWithoutChatSessionsInput, {nullable:false})
    @Type(() => UserCreateWithoutChatSessionsInput)
    create!: UserCreateWithoutChatSessionsInput;
}
