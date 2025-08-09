import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatAssistantGenerationStatus {
	@Field(() => String, { nullable: true })
	status?: string | null;

	@Field(() => Int, { nullable: true })
	lastUserMessageId?: number | null;
}
