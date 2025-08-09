import { Field, ObjectType } from '@nestjs/graphql';
import { ChatSession } from '@generated/chat-session/chat-session.model';

@ObjectType()
export class Chat {
	@Field(() => ChatSession)
	chatSession: ChatSession;
}
