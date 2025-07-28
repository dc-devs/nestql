import type { SelectInput, Count } from '@base/app/dto';
import type { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';
import type { IBasePrismaService } from '@base/app/service/base-prisma-service.inteface';

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

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
		}

		return this.prisma?.[this.modelName].findUnique(options);
	}

	findFirst(
		findFirstArgs: FindFirstArgs,
		select?: SelectInput,
	): Promise<Entity | null> {
		let options = { ...findFirstArgs };

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
		}

		return this.prisma?.[this.modelName].findFirst(options);
	}

	findAll(
		findManyArgs: FindManyArgs = {} as FindManyArgs,
		select?: SelectInput,
	): Promise<Entity[]> {
		let options = { ...findManyArgs };

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
		}

		return this.prisma?.[this.modelName].findMany(options);
	}

	create(data: CreateOneInput, select?: SelectInput): Promise<Entity> {
		let options = { data };

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
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

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
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

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
		}

		return this.prisma?.[this.modelName].upsert(options);
	}

	delete(
		deleteOneArgs: DeleteOneArgs,
		select?: SelectInput,
	): Promise<Entity> {
		let options = { ...deleteOneArgs };

		// Combine both select sources
		const combinedSelect = {
			...(this.select || {}),
			...(select?.include || {}),
		};

		// Only add select if we have actual fields to select
		if (Object.keys(combinedSelect).length > 0) {
			options['select'] = combinedSelect;
		}

		return this.prisma?.[this.modelName].delete(options);
	}
}
