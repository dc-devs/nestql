import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogOutResponse {
	@Field()
	userId: string;

	@Field()
	isAuthenticated: boolean;
}
