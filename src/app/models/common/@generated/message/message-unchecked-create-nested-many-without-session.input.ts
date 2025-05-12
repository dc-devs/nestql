import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutSessionInput } from './message-create-without-session.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutSessionInput } from './message-create-or-connect-without-session.input';
import { MessageCreateManySessionInputEnvelope } from './message-create-many-session-input-envelope.input';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';

@InputType()
export class MessageUncheckedCreateNestedManyWithoutSessionInput {

    @Field(() => [MessageCreateWithoutSessionInput], {nullable:true})
    @Type(() => MessageCreateWithoutSessionInput)
    create?: Array<MessageCreateWithoutSessionInput>;

    @Field(() => [MessageCreateOrConnectWithoutSessionInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutSessionInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutSessionInput>;

    @Field(() => MessageCreateManySessionInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManySessionInputEnvelope)
    createMany?: MessageCreateManySessionInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
}
