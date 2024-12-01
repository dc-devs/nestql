import { Injectable } from '@nestjs/common';
import { User as UserUnsafe } from '@generated/user/user.model';
import { UserSafe } from '@models/users/common/entities/user-safe';
import { modelName, select } from '@models/users/common/constants';
import { UserUpdateInput } from '@generated/user/user-update.input';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { UserCreateInput } from '@generated/user/user-create.input';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import { DeleteOneUserArgs } from '@generated/user/delete-one-user.args';
import { FindFirstUserArgs } from '@generated/user/find-first-user.args';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { CreateManyUserArgs } from '@generated/user/create-many-user.args';
import { FindUniqueUserArgs } from '@generated/user/find-unique-user.args';
import { UpdateManyUserArgs } from '@generated/user/update-many-user.args';
import { hashPassword } from '@root/src/app/models/users/common/utils/hash-password';
import { UserWhereUniqueInput } from '@generated/user/user-where-unique.input';

@Injectable()
export class UsersService extends BasePrismaService<
	UserSafe,
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
			prisma,
			select,
			modelName,
		});
	}

	async create(data: UserCreateInput): Promise<UserSafe> {
		const { email, password } = data;
		const encodedPassword = await hashPassword(password);
		const emailLowerCase = email.toLowerCase();

		return await this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password: encodedPassword,
			},
			select,
		});
	}
}
