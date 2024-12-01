import { SelectInput, Count } from '@base/app/dto';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { IBasePrismaService } from '@base/app/service/base-prisma-service.inteface';

export class BasePrismaService<
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
> implements
		IBasePrismaService<
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
		>
{
	protected modelName: string;
	protected prisma: PrismaService;
	protected select: SelectInput;

	constructor({ prisma, select, modelName }) {
		this.prisma = prisma;
		this.select = select;
		this.modelName = modelName;
	}

	findOne(
		findUniqueArgs: FindUniqueArgs,
		select?: SelectInput,
	): Promise<Entity | null> {
		return this.prisma?.[this.modelName].findUnique({
			...findUniqueArgs,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	findFirst(
		findFirstArgs: FindFirstArgs,
		select?: SelectInput,
	): Promise<Entity | null> {
		return this.prisma?.[this.modelName].findFirst({
			...findFirstArgs,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	findAll(
		findManyArgs: FindManyArgs = {} as FindManyArgs,
		select?: SelectInput,
	): Promise<Entity[]> {
		return this.prisma?.[this.modelName].findMany({
			...findManyArgs,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	create(data: CreateOneInput, select?: SelectInput): Promise<Entity> {
		return this.prisma?.[this.modelName].create({
			data,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	createMany(createManyArgs: CreateManyArgs): Promise<Count> {
		return this.prisma?.[this.modelName].createMany({
			...createManyArgs,
		});
	}

	update({
		where,
		data,
		select,
	}: {
		where: WhereUniqueInput;
		data: UpdateOneInput;
		select?: SelectInput;
	}): Promise<Entity> {
		return this.prisma?.[this.modelName].update({
			where,
			data,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	updateMany(updateManyArgs: UpdateManyArgs): Promise<Count> {
		return this.prisma?.[this.modelName].updateMany({
			...updateManyArgs,
		});
	}

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
	}): Promise<Entity> {
		return this.prisma?.[this.modelName].upsert({
			where,
			update,
			create,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}

	delete(
		deleteOneArgs: DeleteOneArgs,
		select?: SelectInput,
	): Promise<Entity> {
		return this.prisma?.[this.modelName].delete({
			...deleteOneArgs,
			select: {
				...this.select,
				...select?.select,
				...select?.relationships,
			},
		});
	}
}
