import { Module } from '@nestjs/common';
import { MessagesService } from '@models/messages/messages.service';
import { MessagesResolver } from '@models/messages/messages.resolver';
import { PrismaService } from '@base/services/prisma/service/prisma.service';

@Module({
	providers: [MessagesResolver, MessagesService, PrismaService],
	exports: [MessagesService],
})
export class MessagesModule {}
