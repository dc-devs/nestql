import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IDScalar } from '@src/app/common/scalars/id.scalar';

@InputType()
export class NumericIdFilter {
	@Field(() => IDScalar, { nullable: true })
	equals?: number;

	@Field(() => [IDScalar], { nullable: true })
	@Type(() => Number)
	in?: number[];

	@Field(() => [IDScalar], { nullable: true })
	@Type(() => Number)
	notIn?: number[];

	@Field(() => IDScalar, { nullable: true })
	lt?: number;

	@Field(() => IDScalar, { nullable: true })
	lte?: number;

	@Field(() => IDScalar, { nullable: true })
	gt?: number;

	@Field(() => IDScalar, { nullable: true })
	gte?: number;

	@Field(() => IDScalar, { nullable: true })
	not?: number;
}
