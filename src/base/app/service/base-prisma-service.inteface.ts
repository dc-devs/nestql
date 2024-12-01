import { SelectInput, Count } from '@base/app/dto';

export interface IBasePrismaService<
	Entity,
	WhereUniqueInput,
	FindUniqueArgs,
	FindFirstArgs,
	FindManyArgs,
	CreateOneInput,
	CreateManyArgs,
	UpdateOneInput,
	UpdateManyArgs,
	DeleteUserArgs,
> {
	findOne(
		findUniqueArgs: FindUniqueArgs,
		select?: SelectInput,
	): Promise<Entity | null>;

	findFirst(
		findFirstArgs: FindFirstArgs,
		select?: SelectInput,
	): Promise<Entity | null>;

	findAll(
		findManyArgs: FindManyArgs,
		select?: SelectInput,
	): Promise<Entity[]>;

	create(data: CreateOneInput, select?: SelectInput): Promise<Entity>;

	createMany(createManyArgs: CreateManyArgs): Promise<Count>;

	update({
		where,
		data,
		select,
	}: {
		where: WhereUniqueInput;
		data: UpdateOneInput;
		select?: SelectInput;
	}): Promise<Entity>;

	updateMany(updateManyArgs: UpdateManyArgs): Promise<Count>;

	upsert({
		where,
		update,
		create,
		select,
	}: {
		where: WhereUniqueInput;
		update: UpdateOneInput;
		create: CreateOneInput;
		select?: SelectInput;
	}): Promise<Entity>;

	delete(
		deleteOneUserArgs: DeleteUserArgs,
		select?: SelectInput,
	): Promise<Entity>;
}
