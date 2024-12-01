import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Count {
	@Field(() => Int, { nullable: false })
	count!: number;
}
