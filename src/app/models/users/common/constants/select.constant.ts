export const select = {};

/* 
 By default, the database will return all available fields for this model.
 If, by default, you want to select only certain fields, you can activate 
 this default select object.

 This is useful for scenarios where you might want sensitive fields to be 
 hidden from the response.
 
 NOTE: The user 'password' field is hidden by default
 (see prisma.service.ts) so you don't need to update the 
 user select object to hide this field.


 To activate the select object, you'll need to:
*/

/*

/users.service.ts

1. Import the select object
----------------------------------------------
	import { 
		select,
		modelName,
	} from '@models/users/common/constants';
----------------------------------------------

2. Add the select object to the constructor
----------------------------------------------
	constructor(protected prisma: PrismaService) {
		super({
			select,
			prisma,
			modelName,
		});
	}
----------------------------------------------

*/

/*

/default-select.constant.ts (this file)

1. Update the select object to include the fields you want to select.
----------------------------------------------
export const select = {
	id: true,
	email: true,
	role: true,
	createdAt: true,
	updatedAt: true,
};
----------------------------------------------
 
*/
