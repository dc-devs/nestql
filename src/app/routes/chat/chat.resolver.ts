import { ChatService } from '@routes/chat/chat.service';
import { Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';

@ObjectType()
class Chat {
	@Field(() => String)
	id: string;
}

@Resolver()
export class ChatResolver {
	constructor(private readonly chatService: ChatService) {}

	@Mutation(() => Chat)
	async newChat() {
		console.log('newChat');

		return {
			id: '1',
		};
	}

	@Mutation(() => Chat)
	async newMessage() {
		console.log('newChat');

		return {
			id: '2',
		};
	}
}
