import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { UserRole } from '../prisma/user-role.enum';
import { ChatSessionCreateNestedManyWithoutUserInput } from '../chat-session/chat-session-create-nested-many-without-user.input';

@InputType()
export class UserCreateInput {

    @Field(() => String, {nullable:false})
    @Validator.IsEmail()
    email!: string;

    @Field(() => String, {nullable:false})
    @Validator.IsString()
    @Validator.MinLength(8)
    password!: string;

    @Field(() => UserRole, {nullable:true})
    role?: `${UserRole}`;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => ChatSessionCreateNestedManyWithoutUserInput, {nullable:true})
    chatSessions?: ChatSessionCreateNestedManyWithoutUserInput;
}
