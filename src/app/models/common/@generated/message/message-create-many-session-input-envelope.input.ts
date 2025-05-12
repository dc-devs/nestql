import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateManySessionInput } from './message-create-many-session.input';
import { Type } from 'class-transformer';

@InputType()
export class MessageCreateManySessionInputEnvelope {

    @Field(() => [MessageCreateManySessionInput], {nullable:false})
    @Type(() => MessageCreateManySessionInput)
    data!: Array<MessageCreateManySessionInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
