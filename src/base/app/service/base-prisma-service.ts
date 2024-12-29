import { SelectInput, Count } from '@base/app/dto';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { IBasePrismaService } from '@base/app/service/base-prisma-service.inteface';

interface IConstructorOptions {
	modelName: string;
	// TODO: Update to be more specific
	select?: Record<string, any> | SelectInput;
	prisma: PrismaService;
}

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
	protected prisma?: PrismaService;
	protected select: SelectInput;

	constructor({ prisma, select, modelName }: IConstructorOptions) {
		this.prisma = prisma;
		this.select = select;
		this.modelName = modelName;
	}

	findOne(
		findUniqueArgs: FindUniqueArgs,
		select?: SelectInput,
	): Promise<Entity | null> {
		let options = { ...findUniqueArgs };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].findUnique(options);
	}

	findFirst(
		findFirstArgs: FindFirstArgs,
		select?: SelectInput,
	): Promise<Entity | null> {
		let options = { ...findFirstArgs };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].findFirst(options);
	}

	findAll(
		findManyArgs: FindManyArgs = {} as FindManyArgs,
		select?: SelectInput,
	): Promise<Entity[]> {
		let options = { ...findManyArgs };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].findMany(options);
	}

	create(data: CreateOneInput, select?: SelectInput): Promise<Entity> {
		let options = { data };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].create(options);
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
		let options = { where, data };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].update(options);
	}

	updateMany(updateManyArgs: UpdateManyArgs): Promise<Count> {
		return this.prisma?.[this.modelName].updateMany({
			...updateManyArgs,
		});
	}

	// TODO: Add to the resolver?
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
		let options = { where, update, create };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].upsert(options);
	}

	delete(
		deleteOneArgs: DeleteOneArgs,
		select?: SelectInput,
	): Promise<Entity> {
		let options = { ...deleteOneArgs };

		// when default select is provided via the service constructor
		if (this.select) {
			options['select'] = {
				...this.select,
			};
		}

		// when custom select is provided via the query
		if (select) {
			options['select'] = {
				...select.include,
			};
		}

		return this.prisma?.[this.modelName].delete(options);
	}
}
