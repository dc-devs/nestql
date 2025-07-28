import type { ILoginResponse } from '@routes/auth/common/interfaces';
import type { IAuthenticatedRequest } from '@routes/auth/common/interfaces';

export interface ILogOutProps {
	userId: string;
	request: IAuthenticatedRequest;
	response: ILoginResponse;
}
