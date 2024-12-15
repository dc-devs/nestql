import { Injectable } from '@nestjs/common';
import { PrismaService } from '@base/services/prisma/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { TweetFetchHistory } from '@generated/tweet-fetch-history/tweet-fetch-history.model';
import { TweetFetchHistoryUpdateInput } from '@generated/tweet-fetch-history/tweet-fetch-history-update.input';
import { TweetFetchHistoryCreateInput } from '@generated/tweet-fetch-history/tweet-fetch-history-create.input';
import { FindManyTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/find-many-tweet-fetch-history.args';
import { DeleteOneTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/delete-one-tweet-fetch-history.args';
import { FindFirstTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/find-first-tweet-fetch-history.args';
import { CreateManyTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/create-many-tweet-fetch-history.args';
import { FindUniqueTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/find-unique-tweet-fetch-history.args';
import { UpdateManyTweetFetchHistoryArgs } from '@generated/tweet-fetch-history/update-many-tweet-fetch-history.args';
import { TweetFetchHistoryWhereUniqueInput } from '@generated/tweet-fetch-history/tweet-fetch-history-where-unique.input';
import {
	select,
	modelName,
} from '@models/tweet-fetch-histories/common/constants';

@Injectable()
export class TweetFetchHistoriesService extends BasePrismaService<
	TweetFetchHistory,
	TweetFetchHistoryWhereUniqueInput,
	FindUniqueTweetFetchHistoryArgs,
	FindFirstTweetFetchHistoryArgs,
	FindManyTweetFetchHistoryArgs,
	TweetFetchHistoryCreateInput,
	CreateManyTweetFetchHistoryArgs,
	TweetFetchHistoryUpdateInput,
	UpdateManyTweetFetchHistoryArgs,
	DeleteOneTweetFetchHistoryArgs
> {
	constructor(protected prisma: PrismaService) {
		super({
			prisma,
			select,
			modelName,
		});
	}
}
