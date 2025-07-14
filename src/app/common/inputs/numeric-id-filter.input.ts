import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class NumericIdFilter {
	@Field(() => 'NumericID', { nullable: true })
	equals?: number;

	@Field(() => ['NumericID'], { nullable: true })
	@Type(() => Number)
	in?: number[];

	@Field(() => ['NumericID'], { nullable: true })
	@Type(() => Number)
	notIn?: number[];

	@Field(() => 'NumericID', { nullable: true })
	lt?: number;

	@Field(() => 'NumericID', { nullable: true })
	lte?: number;

	@Field(() => 'NumericID', { nullable: true })
	gt?: number;

	@Field(() => 'NumericID', { nullable: true })
	gte?: number;

	@Field(() => 'NumericID', { nullable: true })
	not?: number;
}
