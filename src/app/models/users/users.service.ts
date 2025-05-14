import { Injectable } from '@nestjs/common';
import { select, modelName } from '@models/users/common/constants';
import { PrismaService } from '@base/services/prisma/service/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { User } from '@generated/user/user.model';
import { UserUpdateInput } from '@generated/user/user-update.input';
import { UserCreateInput } from '@generated/user/user-create.input';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import { DeleteOneUserArgs } from '@generated/user/delete-one-user.args';
import { FindFirstUserArgs } from '@generated/user/find-first-user.args';
import { CreateManyUserArgs } from '@generated/user/create-many-user.args';
import { FindUniqueUserArgs } from '@generated/user/find-unique-user.args';
import { UpdateManyUserArgs } from '@generated/user/update-many-user.args';
import { UserWhereUniqueInput } from '@generated/user/user-where-unique.input';

@Injectable()
export class UsersService extends BasePrismaService<
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
> {
	constructor(protected prisma: PrismaService) {
		super({
			select,
			prisma,
			modelName,
		});
	}
}
