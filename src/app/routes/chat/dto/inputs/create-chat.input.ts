import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
	@IsString()
	@Field(() => String, { description: 'The message content from the user' })
	message: string;
}
