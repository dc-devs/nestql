import { Module } from '@nestjs/common';
import { PostsService } from '@models/posts/posts.service';
import { PostsResolver } from '@models/posts/posts.resolver';
import { PrismaService } from '@base/services/prisma/service/prisma.service';

@Module({
	providers: [PostsResolver, PostsService, PrismaService],
	exports: [PostsService],
})
export class PostsModule {}
