import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutChatSessionsInput } from './user-update-without-chat-sessions.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutChatSessionsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutChatSessionsInput, {nullable:false})
    @Type(() => UserUpdateWithoutChatSessionsInput)
    data!: UserUpdateWithoutChatSessionsInput;
}
