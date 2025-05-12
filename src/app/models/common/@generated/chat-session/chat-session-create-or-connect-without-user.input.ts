import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInput } from './chat-session-where-unique.input';
import { Type } from 'class-transformer';
import { ChatSessionCreateWithoutUserInput } from './chat-session-create-without-user.input';

@InputType()
export class ChatSessionCreateOrConnectWithoutUserInput {

    @Field(() => ChatSessionWhereUniqueInput, {nullable:false})
    @Type(() => ChatSessionWhereUniqueInput)
    where!: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;

    @Field(() => ChatSessionCreateWithoutUserInput, {nullable:false})
    @Type(() => ChatSessionCreateWithoutUserInput)
    create!: ChatSessionCreateWithoutUserInput;
}
