// // TODO - This whole file belongs elesewhere
// import { GraphQLError } from 'graphql';
// import { UserValidationError } from '@models/users/enums';
// import ExtensionCode from '@base/services/graphql/errors/extension-code.enum';
// import ErrorCode from '@base/services/prisma/common/enums/error-code.enum';

// const customErrors = {
// 	[ErrorCode.UniqueConstraint]: {
// 		email: () => {
// 			throw new GraphQLError(ExtensionCode.BadUserInput, {
// 				extensions: {
// 					code: ErrorCode.UniqueConstraint,
// 					errors: {
// 						email: {
// 							type: ExtensionCode.BadUserInput,
// 							message: UserValidationError.EMAIL_IS_TAKEN,
// 						},
// 					},
// 				},
// 			});
// 		},
// 	},
// 	[ErrorCode.RecordNotFound]: {
// 		cause: (message: string) => {
// 			throw new GraphQLError(ExtensionCode.BadUserInput, {
// 				extensions: {
// 					code: ErrorCode.UniqueConstraint,
// 					errors: {
// 						cause: {
// 							type: ExtensionCode.BadUserInput,
// 							message,
// 						},
// 					},
// 				},
// 			});
// 		},
// 	},
// };

// export default customErrors;
