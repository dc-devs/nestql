import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryCreateInput } from './tweet-fetch-history-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryCreateInput, {nullable:false})
    @Type(() => TweetFetchHistoryCreateInput)
    data!: TweetFetchHistoryCreateInput;
}
