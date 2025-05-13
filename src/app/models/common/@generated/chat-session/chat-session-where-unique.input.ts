import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class ChatSessionWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [ChatSessionWhereInput], {nullable:true})
    AND?: Array<ChatSessionWhereInput>;

    @Field(() => [ChatSessionWhereInput], {nullable:true})
    OR?: Array<ChatSessionWhereInput>;

    @Field(() => [ChatSessionWhereInput], {nullable:true})
    NOT?: Array<ChatSessionWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    title?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: UserScalarRelationFilter;
}
