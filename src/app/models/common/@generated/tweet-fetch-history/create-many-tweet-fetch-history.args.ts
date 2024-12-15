import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryCreateManyInput } from './tweet-fetch-history-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyTweetFetchHistoryArgs {

    @Field(() => [TweetFetchHistoryCreateManyInput], {nullable:false})
    @Type(() => TweetFetchHistoryCreateManyInput)
    data!: Array<TweetFetchHistoryCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
