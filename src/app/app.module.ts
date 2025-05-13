import { Module } from '@nestjs/common';
import { AppService } from '@src/app/app.service';
import { AppController } from '@src/app/app.controller';
import { AuthModule } from '@models/auth/auth.module';
import { UsersModule } from '@models/users/users.module';
import { GraphQLModule, ConfigModule } from '@base/app/modules';
import { ChatSessionsModule } from '@models/chat-sessions/chat-sessions.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ConfigModule,
		GraphQLModule,
		ChatSessionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
