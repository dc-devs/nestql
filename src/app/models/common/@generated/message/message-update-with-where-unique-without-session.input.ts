import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageUpdateWithoutSessionInput } from './message-update-without-session.input';

@InputType()
export class MessageUpdateWithWhereUniqueWithoutSessionInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;

    @Field(() => MessageUpdateWithoutSessionInput, {nullable:false})
    @Type(() => MessageUpdateWithoutSessionInput)
    data!: MessageUpdateWithoutSessionInput;
}
