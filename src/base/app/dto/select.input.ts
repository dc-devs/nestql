import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class SelectInput {
	@Field(() => GraphQLJSON, { nullable: true })
	include?: any;

	// @Field(() => GraphQLJSON, { nullable: true })
	// relationships?: any;
}
