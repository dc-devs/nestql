import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutSessionInput } from './message-create-without-session.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutSessionInput } from './message-create-or-connect-without-session.input';
import { MessageUpsertWithWhereUniqueWithoutSessionInput } from './message-upsert-with-where-unique-without-session.input';
import { MessageCreateManySessionInputEnvelope } from './message-create-many-session-input-envelope.input';
import { Prisma } from '@prisma/client';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { MessageUpdateWithWhereUniqueWithoutSessionInput } from './message-update-with-where-unique-without-session.input';
import { MessageUpdateManyWithWhereWithoutSessionInput } from './message-update-many-with-where-without-session.input';
import { MessageScalarWhereInput } from './message-scalar-where.input';

@InputType()
export class MessageUncheckedUpdateManyWithoutSessionNestedInput {

    @Field(() => [MessageCreateWithoutSessionInput], {nullable:true})
    @Type(() => MessageCreateWithoutSessionInput)
    create?: Array<MessageCreateWithoutSessionInput>;

    @Field(() => [MessageCreateOrConnectWithoutSessionInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutSessionInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutSessionInput>;

    @Field(() => [MessageUpsertWithWhereUniqueWithoutSessionInput], {nullable:true})
    @Type(() => MessageUpsertWithWhereUniqueWithoutSessionInput)
    upsert?: Array<MessageUpsertWithWhereUniqueWithoutSessionInput>;

    @Field(() => MessageCreateManySessionInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManySessionInputEnvelope)
    createMany?: MessageCreateManySessionInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;

    @Field(() => [MessageUpdateWithWhereUniqueWithoutSessionInput], {nullable:true})
    @Type(() => MessageUpdateWithWhereUniqueWithoutSessionInput)
    update?: Array<MessageUpdateWithWhereUniqueWithoutSessionInput>;

    @Field(() => [MessageUpdateManyWithWhereWithoutSessionInput], {nullable:true})
    @Type(() => MessageUpdateManyWithWhereWithoutSessionInput)
    updateMany?: Array<MessageUpdateManyWithWhereWithoutSessionInput>;

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    @Type(() => MessageScalarWhereInput)
    deleteMany?: Array<MessageScalarWhereInput>;
}
