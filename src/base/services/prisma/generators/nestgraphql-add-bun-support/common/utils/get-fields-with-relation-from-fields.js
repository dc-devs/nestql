export const getFieldsWithRelationFromFields = (model) => {
	const fieldsWithRelationFromFields = [];

	for (const field of model.fields) {
		const relationFromFields = field.relationFromFields;

		if (relationFromFields && relationFromFields.length > 0) {
			fieldsWithRelationFromFields.push(field);
		}
	}

	return fieldsWithRelationFromFields;
};
