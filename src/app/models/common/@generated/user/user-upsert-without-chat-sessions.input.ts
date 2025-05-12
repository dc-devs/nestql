import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutChatSessionsInput } from './user-update-without-chat-sessions.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutChatSessionsInput } from './user-create-without-chat-sessions.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutChatSessionsInput {

    @Field(() => UserUpdateWithoutChatSessionsInput, {nullable:false})
    @Type(() => UserUpdateWithoutChatSessionsInput)
    update!: UserUpdateWithoutChatSessionsInput;

    @Field(() => UserCreateWithoutChatSessionsInput, {nullable:false})
    @Type(() => UserCreateWithoutChatSessionsInput)
    create!: UserCreateWithoutChatSessionsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
