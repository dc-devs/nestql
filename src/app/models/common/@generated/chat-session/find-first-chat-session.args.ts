import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ChatSessionWhereInput } from './chat-session-where.input';
import { Type } from 'class-transformer';
import { ChatSessionOrderByWithRelationInput } from './chat-session-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ChatSessionScalarFieldEnum } from './chat-session-scalar-field.enum';

@ArgsType()
export class FindFirstChatSessionArgs {

    @Field(() => ChatSessionWhereInput, {nullable:true})
    @Type(() => ChatSessionWhereInput)
    where?: ChatSessionWhereInput;

    @Field(() => [ChatSessionOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;

    @Field(() => ChatSessionWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ChatSessionScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ChatSessionScalarFieldEnum>;
}
