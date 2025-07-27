import { ILoginResponse } from '@routes/auth/common/interfaces';
import { IAuthenticatedRequest } from '@routes/auth/common/interfaces';

export interface ILogOutProps {
	userId: string;
	request: IAuthenticatedRequest;
	response: ILoginResponse;
}
