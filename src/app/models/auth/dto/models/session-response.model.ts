import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@generated/user/user.model';
import { UserSafe } from '@models/users/common/entities/user-safe';

@ObjectType()
export class SessionResponse {
	@Field(() => User, { nullable: true })
	user: UserSafe;

	@Field(() => Boolean, { nullable: true })
	isAuthenticated: boolean;
}
