import { Resolver } from '@nestjs/graphql';
import { BasePrismaResolver } from '@base/app/resolver/base-prisma-resolver';
import { MessagesService } from '@models/messages/messages.service';
import { Message } from '@generated/message/message.model';
import { MessageUpdateInput } from '@generated/message/message-update.input';
import { MessageCreateInput } from '@generated/message/message-create.input';
import { FindManyMessageArgs } from '@generated/message/find-many-message.args';
import { FindFirstMessageArgs } from '@generated/message/find-first-message.args';
import { DeleteOneMessageArgs } from '@generated/message/delete-one-message.args';
import { FindUniqueMessageArgs } from '@generated/message/find-unique-message.args';
import { CreateManyMessageArgs } from '@generated/message/create-many-message.args';
import { UpdateManyMessageArgs } from '@generated/message/update-many-message.args';
import { MessageWhereUniqueInput } from '@generated/message/message-where-unique.input';

@Resolver(() => Message)
export class MessagesResolver extends BasePrismaResolver<
	Message,
	MessageWhereUniqueInput,
	FindUniqueMessageArgs,
	FindFirstMessageArgs,
	FindManyMessageArgs,
	MessageCreateInput,
	CreateManyMessageArgs,
	MessageUpdateInput,
	UpdateManyMessageArgs,
	DeleteOneMessageArgs
>({
	entity: Message,
	whereUniqueInput: MessageWhereUniqueInput,
	findUniqueArgs: FindUniqueMessageArgs,
	findFirstArgs: FindFirstMessageArgs,
	findManyArgs: FindManyMessageArgs,
	createOneInput: MessageCreateInput,
	createManyArgs: CreateManyMessageArgs,
	updateOneInput: MessageUpdateInput,
	updateManyArgs: UpdateManyMessageArgs,
	deleteOneArgs: DeleteOneMessageArgs,
}) {
	constructor(protected readonly service: MessagesService) {
		super({ baseService: service });
	}
}
