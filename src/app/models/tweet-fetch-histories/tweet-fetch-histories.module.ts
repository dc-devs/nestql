import { Module } from '@nestjs/common';
import { TweetFetchHistoriesService } from '@models/tweet-fetch-histories/tweet-fetch-histories.service';
import { TweetFetchHistoriesResolver } from '@models/tweet-fetch-histories/tweet-fetch-histories.resolver';
import { PrismaService } from '@base/services/prisma/prisma.service';

@Module({
	providers: [TweetFetchHistoriesResolver, TweetFetchHistoriesService, PrismaService],
	exports: [TweetFetchHistoriesService],
})
export class TweetFetchHistoriesModule {}
