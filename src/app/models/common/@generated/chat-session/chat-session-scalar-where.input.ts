import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class ChatSessionScalarWhereInput {

    @Field(() => [ChatSessionScalarWhereInput], {nullable:true})
    AND?: Array<ChatSessionScalarWhereInput>;

    @Field(() => [ChatSessionScalarWhereInput], {nullable:true})
    OR?: Array<ChatSessionScalarWhereInput>;

    @Field(() => [ChatSessionScalarWhereInput], {nullable:true})
    NOT?: Array<ChatSessionScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
