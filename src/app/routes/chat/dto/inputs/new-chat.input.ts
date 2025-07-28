import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewChatInput {
	@IsString()
	@Field(() => String, { description: 'The message content from the user' })
	message: string;
}
