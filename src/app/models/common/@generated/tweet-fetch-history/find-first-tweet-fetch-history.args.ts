import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TweetFetchHistoryWhereInput } from './tweet-fetch-history-where.input';
import { Type } from 'class-transformer';
import { TweetFetchHistoryOrderByWithRelationInput } from './tweet-fetch-history-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TweetFetchHistoryWhereUniqueInput } from './tweet-fetch-history-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TweetFetchHistoryScalarFieldEnum } from './tweet-fetch-history-scalar-field.enum';

@ArgsType()
export class FindFirstTweetFetchHistoryArgs {

    @Field(() => TweetFetchHistoryWhereInput, {nullable:true})
    @Type(() => TweetFetchHistoryWhereInput)
    where?: TweetFetchHistoryWhereInput;

    @Field(() => [TweetFetchHistoryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TweetFetchHistoryOrderByWithRelationInput>;

    @Field(() => TweetFetchHistoryWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<TweetFetchHistoryWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [TweetFetchHistoryScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof TweetFetchHistoryScalarFieldEnum>;
}
