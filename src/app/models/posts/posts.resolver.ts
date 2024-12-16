import { Resolver } from '@nestjs/graphql';
import { BasePrismaResolver } from '@base/app/resolver/base-prisma-resolver';
import { PostsService } from '@models/posts/posts.service';
import { Post } from '@generated/post/post.model';
import { PostUpdateInput } from '@generated/post/post-update.input';
import { PostCreateInput } from '@generated/post/post-create.input';
import { FindManyPostArgs } from '@generated/post/find-many-post.args';
import { FindFirstPostArgs } from '@generated/post/find-first-post.args';
import { DeleteOnePostArgs } from '@generated/post/delete-one-post.args';
import { FindUniquePostArgs } from '@generated/post/find-unique-post.args';
import { CreateManyPostArgs } from '@generated/post/create-many-post.args';
import { UpdateManyPostArgs } from '@generated/post/update-many-post.args';
import { PostWhereUniqueInput } from '@generated/post/post-where-unique.input';

@Resolver(() => Post)
export class PostsResolver extends BasePrismaResolver<
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
>({
	entity: Post,
	whereUniqueInput: PostWhereUniqueInput,
	findUniqueArgs: FindUniquePostArgs,
	findFirstArgs: FindFirstPostArgs,
	findManyArgs: FindManyPostArgs,
	createOneInput: PostCreateInput,
	createManyArgs: CreateManyPostArgs,
	updateOneInput: PostUpdateInput,
	updateManyArgs: UpdateManyPostArgs,
	deleteOneArgs: DeleteOnePostArgs,
}) {
	constructor(protected readonly service: PostsService) {
		super({ baseService: service });
	}
}
