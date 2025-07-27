import { Module } from '@nestjs/common';
import { AppService } from '@src/app/app.service';
import { AuthModule } from '@models/auth/auth.module';
import { AppController } from '@src/app/app.controller';
import { UsersModule } from '@models/users/users.module';
import { GraphQLModule, ConfigModule } from '@base/app/modules';
import { MessagesModule } from '@models/messages/messages.module';
import { ChatModule } from '@root/src/app/routes/chat/chat.module';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';

@Module({
	imports: [
		ChatModule,
		AuthModule,
		UsersModule,
		ConfigModule,
		MastraModule,
		GraphQLModule,
		MessagesModule,
		ChatSessionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
