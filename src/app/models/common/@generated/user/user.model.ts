import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';
import { Post } from '../post/post.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => UserRole, {nullable:false,defaultValue:'USER'})
    role!: keyof typeof UserRole;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Post], {nullable:true})
    posts?: Array<Post>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
