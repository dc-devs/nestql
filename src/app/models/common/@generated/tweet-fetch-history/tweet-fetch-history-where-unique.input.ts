import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TweetFetchHistoryWhereInput } from './tweet-fetch-history-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TweetFetchHistoryWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    AND?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    OR?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    NOT?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
