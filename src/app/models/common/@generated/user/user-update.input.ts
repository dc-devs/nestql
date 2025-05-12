import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { UserRole } from '../prisma/user-role.enum';
import { ChatSessionUpdateManyWithoutUserNestedInput } from '../chat-session/chat-session-update-many-without-user-nested.input';

@InputType()
export class UserUpdateInput {

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsString()
    @Validator.MinLength(8)
    password?: string;

    @Field(() => UserRole, {nullable:true})
    role?: keyof typeof UserRole;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => ChatSessionUpdateManyWithoutUserNestedInput, {nullable:true})
    chatSessions?: ChatSessionUpdateManyWithoutUserNestedInput;
}
