import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class MessageScalarWhereInput {

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    AND?: Array<MessageScalarWhereInput>;

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    OR?: Array<MessageScalarWhereInput>;

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    NOT?: Array<MessageScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    sender?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    type?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    content?: StringNullableFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    payload?: JsonNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    timestamp?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    chatSessionId?: IntFilter;
}
