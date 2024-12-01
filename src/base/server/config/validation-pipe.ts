import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
	transform: true,
	forbidNonWhitelisted: true,
	transformOptions: {
		enableImplicitConversion: true,
	},
});
