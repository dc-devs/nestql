import { User } from '@generated/user/user.model';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class UserSafe extends OmitType(User, ['password'] as const) {}
