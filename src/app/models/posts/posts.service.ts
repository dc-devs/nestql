import { Injectable } from '@nestjs/common';
import { modelName } from '@models/posts/common/constants';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { Post } from '@generated/post/post.model';
import { PostUpdateInput } from '@generated/post/post-update.input';
import { PostCreateInput } from '@generated/post/post-create.input';
import { FindManyPostArgs } from '@generated/post/find-many-post.args';
import { DeleteOnePostArgs } from '@generated/post/delete-one-post.args';
import { FindFirstPostArgs } from '@generated/post/find-first-post.args';
import { CreateManyPostArgs } from '@generated/post/create-many-post.args';
import { FindUniquePostArgs } from '@generated/post/find-unique-post.args';
import { UpdateManyPostArgs } from '@generated/post/update-many-post.args';
import { PostWhereUniqueInput } from '@generated/post/post-where-unique.input';

@Injectable()
export class PostsService extends BasePrismaService<
	Post,
	PostWhereUniqueInput,
	FindUniquePostArgs,
	FindFirstPostArgs,
	FindManyPostArgs,
	PostCreateInput,
	CreateManyPostArgs,
	PostUpdateInput,
	UpdateManyPostArgs,
	DeleteOnePostArgs
> {
	constructor(protected prisma: PrismaService) {
		super({
			prisma,
			modelName,
		});
	}
}
