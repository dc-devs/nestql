import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageCreateWithoutSessionInput } from './message-create-without-session.input';

@InputType()
export class MessageCreateOrConnectWithoutSessionInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;

    @Field(() => MessageCreateWithoutSessionInput, {nullable:false})
    @Type(() => MessageCreateWithoutSessionInput)
    create!: MessageCreateWithoutSessionInput;
}
