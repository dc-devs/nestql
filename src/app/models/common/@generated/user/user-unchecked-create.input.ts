import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { UserRole } from '../prisma/user-role.enum';
import { PostUncheckedCreateNestedManyWithoutUserInput } from '../post/post-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    @Validator.IsEmail()
    email!: string;

    @Field(() => String, {nullable:false})
    @Validator.IsString()
    @Validator.MinLength(8)
    password!: string;

    @Field(() => UserRole, {nullable:true})
    role?: keyof typeof UserRole;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => PostUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    posts?: PostUncheckedCreateNestedManyWithoutUserInput;
}
