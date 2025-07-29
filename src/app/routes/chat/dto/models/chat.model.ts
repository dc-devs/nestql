import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '@generated/message/message.model';
import { ChatSession } from '@generated/chat-session/chat-session.model';

@ObjectType()
export class Chat {
	@Field(() => ChatSession)
	chatSession: ChatSession;

	@Field(() => [Message])
	messages: Message[];
}
