import { ILoginResponse } from '@models/auth/common/interfaces';
import { IAuthenticatedRequest } from '@models/auth/common/interfaces';

export interface ILogOutProps {
	userId: string;
	request: IAuthenticatedRequest;
	response: ILoginResponse;
}
