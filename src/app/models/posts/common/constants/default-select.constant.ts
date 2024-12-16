export const select = {};

/* 
 By default, the database will return all available fields for this model.
 If, by default, you want to select only certain fields, you can activate this default select object.

 This is useful for scenarios where you might want sensitive fields to be hidden from the response.
 You can see an example of this in the User model where we omit the password field from the response.

 To activate the select object, you'll need to:
*/

/*

/posts.service.ts

1. Import the select object
----------------------------------------------
	import { 
		select,
		modelName,
	} from '@models/posts/common/constants';
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
select = {
	id: true,
	title: true,
	content: true,
	updatedAt: true,
	createdAt: true,
};
----------------------------------------------
 
*/
