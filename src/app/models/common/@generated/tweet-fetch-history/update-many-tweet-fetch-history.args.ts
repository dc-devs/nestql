import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryUpdateManyMutationInput } from './tweet-fetch-history-update-many-mutation.input';
import { Type } from 'class-transformer';
import { TweetFetchHistoryWhereInput } from './tweet-fetch-history-where.input';

@ArgsType()
export class UpdateManyTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryUpdateManyMutationInput, {nullable:false})
    @Type(() => TweetFetchHistoryUpdateManyMutationInput)
    data!: TweetFetchHistoryUpdateManyMutationInput;

    @Field(() => TweetFetchHistoryWhereInput, {nullable:true})
    @Type(() => TweetFetchHistoryWhereInput)
    where?: TweetFetchHistoryWhereInput;
}
