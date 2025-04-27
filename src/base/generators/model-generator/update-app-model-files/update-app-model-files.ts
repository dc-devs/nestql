import { addNewModuleToAppModule } from '@base/generators/model-generator/update-app-model-files/add-new-module-to-app-module/add-new-module-to-app-module';

interface IOptions {
	modelName: string;
}

export const updateAppModelFiles = async ({ modelName }: IOptions) => {
	await addNewModuleToAppModule({ modelName });
};
