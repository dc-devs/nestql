import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TweetFetchHistoryWhereUniqueInput } from './tweet-fetch-history-where-unique.input';
import { Type } from 'class-transformer';
import { TweetFetchHistoryCreateInput } from './tweet-fetch-history-create.input';
import { TweetFetchHistoryUpdateInput } from './tweet-fetch-history-update.input';

@ArgsType()
export class UpsertOneTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryWhereUniqueInput, {nullable:false})
    @Type(() => TweetFetchHistoryWhereUniqueInput)
    where!: Prisma.AtLeast<TweetFetchHistoryWhereUniqueInput, 'id'>;

    @Field(() => TweetFetchHistoryCreateInput, {nullable:false})
    @Type(() => TweetFetchHistoryCreateInput)
    create!: TweetFetchHistoryCreateInput;

    @Field(() => TweetFetchHistoryUpdateInput, {nullable:false})
    @Type(() => TweetFetchHistoryUpdateInput)
    update!: TweetFetchHistoryUpdateInput;
}
