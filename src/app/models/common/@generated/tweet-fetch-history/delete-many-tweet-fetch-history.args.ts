import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryWhereInput } from './tweet-fetch-history-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryWhereInput, {nullable:true})
    @Type(() => TweetFetchHistoryWhereInput)
    where?: TweetFetchHistoryWhereInput;
}
