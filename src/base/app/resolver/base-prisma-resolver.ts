import { Type } from '@nestjs/common';
import * as pluralize from 'pluralize';
import { SelectInput, Count } from '@base/app/dto';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { IBasePrismaService } from '@base/app/service/base-prisma-service.inteface';

export function BasePrismaResolver<
	Entity,
	WhereUniqueInput,
	FindUniqueArgs,
	FindFirstArgs,
	FindManyArgs,
	CreateOneInput,
	CreateManyArgs,
	UpdateOneInput,
	UpdateManyArgs,
	DeleteOneArgs,
>({
	entity,
	whereUniqueInput,
	findUniqueArgs,
	findFirstArgs,
	findManyArgs,
	createOneInput,
	createManyArgs,
	updateOneInput,
	updateManyArgs,
	deleteOneArgs,
}: {
	entity: Type<Entity>;
	whereUniqueInput: Type<WhereUniqueInput>;
	findUniqueArgs: Type<FindUniqueArgs>;
	findFirstArgs: Type<FindFirstArgs>;
	findManyArgs: Type<FindManyArgs>;
	createOneInput: Type<CreateOneInput>;
	createManyArgs: Type<CreateManyArgs>;
	updateOneInput: Type<UpdateOneInput>;
	updateManyArgs: Type<UpdateManyArgs>;
	deleteOneArgs: Type<DeleteOneArgs>;
}) {
	@Resolver({ isAbstract: true })
	abstract class BasePrismaResolverAbstract {
		baseService: IBasePrismaService<
			Entity,
			WhereUniqueInput,
			FindUniqueArgs,
			FindFirstArgs,
			FindManyArgs,
			CreateOneInput,
			CreateManyArgs,
			UpdateOneInput,
			UpdateManyArgs,
			DeleteOneArgs
		>;

		constructor({
			baseService,
		}: {
			baseService: IBasePrismaService<
				Entity,
				WhereUniqueInput,
				FindUniqueArgs,
				FindFirstArgs,
				FindManyArgs,
				CreateOneInput,
				CreateManyArgs,
				UpdateOneInput,
				UpdateManyArgs,
				DeleteOneArgs
			>;
		}) {
			this.baseService = baseService;
		}

		@Query(() => entity, {
			name: `findOne${entity.name}`,
			nullable: true,
		})
		findOne(
			@Args({ type: () => findUniqueArgs })
			args: FindUniqueArgs,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity | null> {
			return this.baseService.findOne(args, select);
		}

		@Query(() => entity, {
			name: `findFirst${entity.name}`,
			nullable: true,
		})
		findFirst(
			@Args({ type: () => findFirstArgs })
			args: FindFirstArgs,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity | null> {
			return this.baseService.findFirst(args, select);
		}

		@Query(() => [entity], {
			name: `findAll${pluralize.plural(entity.name)}`,
		})
		findAll(
			@Args({ type: () => findManyArgs })
			args: FindManyArgs,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity[]> {
			return this.baseService.findAll(args, select);
		}

		@Mutation(() => entity, { name: `create${entity.name}` })
		async create(
			@Args('data', { type: () => createOneInput })
			data: CreateOneInput,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity> {
			return await this.baseService.create(data, select);
		}

		@Mutation(() => Count, { name: `createMany${entity.name}` })
		async createMany(
			@Args({ type: () => createManyArgs })
			args: CreateManyArgs,
		): Promise<Count> {
			return await this.baseService.createMany(args);
		}

		@Mutation(() => entity, { name: `update${entity.name}` })
		async update(
			@Args('data', { type: () => updateOneInput })
			data: UpdateOneInput,
			@Args('where', { type: () => whereUniqueInput })
			where: WhereUniqueInput,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity> {
			return await this.baseService.update({ where, data, select });
		}

		@Mutation(() => Count, { name: `updateMany${entity.name}` })
		async updateMany(
			@Args({ type: () => updateManyArgs })
			args: UpdateManyArgs,
		): Promise<Count> {
			return await this.baseService.updateMany(args);
		}

		@Mutation(() => entity, { name: `delete${entity.name}` })
		async delete(
			@Args({ type: () => deleteOneArgs })
			args: DeleteOneArgs,
			@Args('select', { type: () => SelectInput, nullable: true })
			select?: SelectInput,
		): Promise<Entity> {
			return await this.baseService.delete(args, select);
		}
	}

	return BasePrismaResolverAbstract;
}
