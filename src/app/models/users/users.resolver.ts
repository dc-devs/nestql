import { Resolver } from '@nestjs/graphql';
import { BasePrismaResolver } from '@base/app/resolver/base-prisma-resolver';
import { UsersService } from '@models/users/users.service';
import { User } from '@generated/user/user.model';
import { UserUpdateInput } from '@generated/user/user-update.input';
import { UserCreateInput } from '@generated/user/user-create.input';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import { FindFirstUserArgs } from '@generated/user/find-first-user.args';
import { DeleteOneUserArgs } from '@generated/user/delete-one-user.args';
import { FindUniqueUserArgs } from '@generated/user/find-unique-user.args';
import { CreateManyUserArgs } from '@generated/user/create-many-user.args';
import { UpdateManyUserArgs } from '@generated/user/update-many-user.args';
import { UserWhereUniqueInput } from '@generated/user/user-where-unique.input';

@Resolver(() => User)
export class UsersResolver extends BasePrismaResolver<
	User,
	UserWhereUniqueInput,
	FindUniqueUserArgs,
	FindFirstUserArgs,
	FindManyUserArgs,
	UserCreateInput,
	CreateManyUserArgs,
	UserUpdateInput,
	UpdateManyUserArgs,
	DeleteOneUserArgs
>({
	entity: User,
	whereUniqueInput: UserWhereUniqueInput,
	findUniqueArgs: FindUniqueUserArgs,
	findFirstArgs: FindFirstUserArgs,
	findManyArgs: FindManyUserArgs,
	createOneInput: UserCreateInput,
	createManyArgs: CreateManyUserArgs,
	updateOneInput: UserUpdateInput,
	updateManyArgs: UpdateManyUserArgs,
	deleteOneArgs: DeleteOneUserArgs,
}) {
	constructor(protected readonly service: UsersService) {
		super({ baseService: service });
	}
}
