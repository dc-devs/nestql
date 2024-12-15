import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryUpdateInput } from './tweet-fetch-history-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { TweetFetchHistoryWhereUniqueInput } from './tweet-fetch-history-where-unique.input';

@ArgsType()
export class UpdateOneTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryUpdateInput, {nullable:false})
    @Type(() => TweetFetchHistoryUpdateInput)
    data!: TweetFetchHistoryUpdateInput;

    @Field(() => TweetFetchHistoryWhereUniqueInput, {nullable:false})
    @Type(() => TweetFetchHistoryWhereUniqueInput)
    where!: Prisma.AtLeast<TweetFetchHistoryWhereUniqueInput, 'id'>;
}
