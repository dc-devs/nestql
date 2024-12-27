import { addNewModuleToAppModule } from '@base/generators/model-generator/update-app-files/add-new-module-to-app-module/add-new-module-to-app-module';

interface IOptions {
	modelName: string;
}

export const updateAppFiles = async ({ modelName }: IOptions) => {
	await addNewModuleToAppModule({ modelName });
};
