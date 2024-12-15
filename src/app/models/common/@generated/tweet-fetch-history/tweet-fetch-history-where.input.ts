import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TweetFetchHistoryWhereInput {

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    AND?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    OR?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => [TweetFetchHistoryWhereInput], {nullable:true})
    NOT?: Array<TweetFetchHistoryWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
