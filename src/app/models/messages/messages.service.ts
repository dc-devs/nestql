import { Injectable } from '@nestjs/common';
import { select, modelName} from '@models/messages/common/constants';
import { PrismaService } from '@base/services/prisma/service/prisma.service';
import { BasePrismaService } from '@base/app/service/base-prisma-service';
import { Message } from '@generated/message/message.model';
import { MessageUpdateInput } from '@generated/message/message-update.input';
import { MessageCreateInput } from '@generated/message/message-create.input';
import { FindManyMessageArgs } from '@generated/message/find-many-message.args';
import { DeleteOneMessageArgs } from '@generated/message/delete-one-message.args';
import { FindFirstMessageArgs } from '@generated/message/find-first-message.args';
import { CreateManyMessageArgs } from '@generated/message/create-many-message.args';
import { FindUniqueMessageArgs } from '@generated/message/find-unique-message.args';
import { UpdateManyMessageArgs } from '@generated/message/update-many-message.args';
import { MessageWhereUniqueInput } from '@generated/message/message-where-unique.input';

@Injectable()
export class MessagesService extends BasePrismaService<
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
> {
	constructor(protected prisma: PrismaService) {
		super({
			select,
			prisma,
			modelName,
		});
	}
}
