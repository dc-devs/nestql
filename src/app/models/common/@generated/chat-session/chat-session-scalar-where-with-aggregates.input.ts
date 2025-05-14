import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class ChatSessionScalarWhereWithAggregatesInput {

    @Field(() => [ChatSessionScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ChatSessionScalarWhereWithAggregatesInput>;

    @Field(() => [ChatSessionScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ChatSessionScalarWhereWithAggregatesInput>;

    @Field(() => [ChatSessionScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ChatSessionScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
