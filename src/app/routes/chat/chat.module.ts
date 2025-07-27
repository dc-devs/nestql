import { Module } from '@nestjs/common';
import { ChatService } from '@routes/chat/chat.service';
import { ChatResolver } from '@routes/chat/chat.resolver';
import { MessagesModule } from '@models/messages/messages.module';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';

@Module({
	imports: [MessagesModule, ChatSessionsModule, MastraModule],
	providers: [ChatResolver, ChatService],
	exports: [ChatService],
})
export class ChatModule {}
