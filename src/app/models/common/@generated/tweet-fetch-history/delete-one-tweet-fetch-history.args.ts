import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TweetFetchHistoryWhereUniqueInput } from './tweet-fetch-history-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryWhereUniqueInput, {nullable:false})
    @Type(() => TweetFetchHistoryWhereUniqueInput)
    where!: Prisma.AtLeast<TweetFetchHistoryWhereUniqueInput, 'id'>;
}
