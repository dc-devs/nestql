import { type CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, type ValueNode } from 'graphql';

@Scalar('NumericID')
export class IDScalar
	implements
		CustomScalar<number | number[], number | string | number[] | string[]>
{
	description = 'Custom ID scalar type that handles numeric IDs';

	parseValue(
		value: string | number | string[] | number[],
	): number | number[] {
		if (Array.isArray(value)) {
			return value.map((v) => {
				if (typeof v === 'number') return v;
				const parsed = parseInt(v, 10);
				if (isNaN(parsed)) {
					throw new Error('Invalid ID value in array');
				}
				return parsed;
			});
		}
		if (typeof value === 'number') return value;
		const parsed = parseInt(value, 10);
		if (isNaN(parsed)) {
			throw new Error('Invalid ID value');
		}
		return parsed;
	}

	serialize(value: number | number[]): number | number[] {
		return value;
	}

	parseLiteral(ast: ValueNode): number | number[] {
		if (ast.kind === Kind.LIST) {
			return ast.values
				.map((value) => {
					if (value.kind === Kind.INT) {
						return parseInt(value.value, 10);
					}
					if (value.kind === Kind.STRING) {
						const parsed = parseInt(value.value, 10);
						if (isNaN(parsed)) {
							throw new Error('Invalid ID value in array');
						}
						return parsed;
					}
					return null;
				})
				.filter((v) => v !== null);
		}
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10);
		}
		if (ast.kind === Kind.STRING) {
			const parsed = parseInt(ast.value, 10);
			if (isNaN(parsed)) {
				throw new Error('Invalid ID value');
			}
			return parsed;
		}
		return null;
	}
}
