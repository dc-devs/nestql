import { Module } from '@nestjs/common';
import { AppService } from '@src/app/app.service';
import { ChatModule } from '@routes/chat/chat.module';
import { AuthModule } from '@routes/auth/auth.module';
import { AppController } from '@src/app/app.controller';
import { UsersModule } from '@models/users/users.module';
import { GraphQLModule, ConfigModule } from '@base/app/modules';
import { MessagesModule } from '@models/messages/messages.module';
import { QueueModule } from '@src/app/modules/queue/queue.module';
import type { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MastraModule } from '@src/app/modules/mastra/mastra.module';
import { LoggerMiddleware } from '@base/common/middleware/logger.middleware';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';
import { PrismaService } from '@root/src/base/services/prisma/service/prisma.service';

@Module({
	imports: [
		ChatModule,
		AuthModule,
		UsersModule,
		QueueModule,
		ConfigModule,
		MastraModule,
		GraphQLModule,
		MessagesModule,
		ChatSessionsModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
