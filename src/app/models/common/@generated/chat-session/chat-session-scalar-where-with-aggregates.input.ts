import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
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

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    title?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;
}
