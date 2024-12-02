import { Request } from '@nestjs/common';
import { UserSafe } from '@models/users/common/entities/user-safe';

// TODO: add session / sessionStore types
export interface IAuthenticatedRequest extends Request {
	user?: UserSafe;
	session?: any;
	sessionStore?: any;
}
