import { Prisma } from '@prisma/client';
export declare enum UserScalarFieldEnum {
    id = "id",
    email = "email",
    password = "password",
    role = "role",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare enum TransactionIsolationLevel {
    ReadUncommitted = "ReadUncommitted",
    ReadCommitted = "ReadCommitted",
    RepeatableRead = "RepeatableRead",
    Serializable = "Serializable"
}
export declare enum SortOrder {
    asc = "asc",
    desc = "desc"
}
export declare enum QueryMode {
    'default' = "default",
    insensitive = "insensitive"
}
export declare enum NullsOrder {
    first = "first",
    last = "last"
}
export declare enum NullableJsonNullValueInput {
    DbNull = "DbNull",
    JsonNull = "JsonNull"
}
export declare enum JsonNullValueFilter {
    DbNull = "DbNull",
    JsonNull = "JsonNull",
    AnyNull = "AnyNull"
}
export declare enum MessageScalarFieldEnum {
    id = "id",
    sender = "sender",
    type = "type",
    content = "content",
    payload = "payload",
    timestamp = "timestamp",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    chatSessionId = "chatSessionId"
}
export declare enum ChatSessionScalarFieldEnum {
    id = "id",
    title = "title",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    userId = "userId"
}
export declare class AggregateChatSession {
    _count?: InstanceType<typeof ChatSessionCountAggregate>;
    _avg?: InstanceType<typeof ChatSessionAvgAggregate>;
    _sum?: InstanceType<typeof ChatSessionSumAggregate>;
    _min?: InstanceType<typeof ChatSessionMinAggregate>;
    _max?: InstanceType<typeof ChatSessionMaxAggregate>;
}
export declare class ChatSessionAggregateArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof ChatSessionCountAggregateInput>;
    _avg?: InstanceType<typeof ChatSessionAvgAggregateInput>;
    _sum?: InstanceType<typeof ChatSessionSumAggregateInput>;
    _min?: InstanceType<typeof ChatSessionMinAggregateInput>;
    _max?: InstanceType<typeof ChatSessionMaxAggregateInput>;
}
export declare class ChatSessionAvgAggregateInput {
    id?: true;
    userId?: true;
}
export declare class ChatSessionAvgAggregate {
    id?: number;
    userId?: number;
}
export declare class ChatSessionAvgOrderByAggregateInput {
    id?: `${SortOrder}`;
    userId?: `${SortOrder}`;
}
export declare class ChatSessionCountAggregateInput {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    _all?: true;
}
export declare class ChatSessionCountAggregate {
    id: number;
    title: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    _all: number;
}
export declare class ChatSessionCountOrderByAggregateInput {
    id?: `${SortOrder}`;
    title?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    userId?: `${SortOrder}`;
}
export declare class ChatSessionCount {
    messages?: number;
}
export declare class ChatSessionCreateManyUserInputEnvelope {
    data: Array<ChatSessionCreateManyUserInput>;
    skipDuplicates?: boolean;
}
export declare class ChatSessionCreateManyUserInput {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class ChatSessionCreateManyInput {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: number;
}
export declare class ChatSessionCreateNestedManyWithoutUserInput {
    create?: Array<ChatSessionCreateWithoutUserInput>;
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;
    createMany?: InstanceType<typeof ChatSessionCreateManyUserInputEnvelope>;
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
}
export declare class ChatSessionCreateNestedOneWithoutMessagesInput {
    create?: InstanceType<typeof ChatSessionCreateWithoutMessagesInput>;
    connectOrCreate?: InstanceType<typeof ChatSessionCreateOrConnectWithoutMessagesInput>;
    connect?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
export declare class ChatSessionCreateOrConnectWithoutMessagesInput {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    create: InstanceType<typeof ChatSessionCreateWithoutMessagesInput>;
}
export declare class ChatSessionCreateOrConnectWithoutUserInput {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    create: InstanceType<typeof ChatSessionCreateWithoutUserInput>;
}
export declare class ChatSessionCreateWithoutMessagesInput {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: InstanceType<typeof UserCreateNestedOneWithoutChatSessionsInput>;
}
export declare class ChatSessionCreateWithoutUserInput {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: InstanceType<typeof MessageCreateNestedManyWithoutChatSessionInput>;
}
export declare class ChatSessionCreateInput {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: InstanceType<typeof UserCreateNestedOneWithoutChatSessionsInput>;
    messages?: InstanceType<typeof MessageCreateNestedManyWithoutChatSessionInput>;
}
export declare class ChatSessionGroupByArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    orderBy?: Array<ChatSessionOrderByWithAggregationInput>;
    by: Array<`${ChatSessionScalarFieldEnum}`>;
    having?: InstanceType<typeof ChatSessionScalarWhereWithAggregatesInput>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof ChatSessionCountAggregateInput>;
    _avg?: InstanceType<typeof ChatSessionAvgAggregateInput>;
    _sum?: InstanceType<typeof ChatSessionSumAggregateInput>;
    _min?: InstanceType<typeof ChatSessionMinAggregateInput>;
    _max?: InstanceType<typeof ChatSessionMaxAggregateInput>;
}
export declare class ChatSessionGroupBy {
    id: number;
    title: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    userId: number;
    _count?: InstanceType<typeof ChatSessionCountAggregate>;
    _avg?: InstanceType<typeof ChatSessionAvgAggregate>;
    _sum?: InstanceType<typeof ChatSessionSumAggregate>;
    _min?: InstanceType<typeof ChatSessionMinAggregate>;
    _max?: InstanceType<typeof ChatSessionMaxAggregate>;
}
export declare class ChatSessionListRelationFilter {
    every?: InstanceType<typeof ChatSessionWhereInput>;
    some?: InstanceType<typeof ChatSessionWhereInput>;
    none?: InstanceType<typeof ChatSessionWhereInput>;
}
export declare class ChatSessionMaxAggregateInput {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
}
export declare class ChatSessionMaxAggregate {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
}
export declare class ChatSessionMaxOrderByAggregateInput {
    id?: `${SortOrder}`;
    title?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    userId?: `${SortOrder}`;
}
export declare class ChatSessionMinAggregateInput {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
}
export declare class ChatSessionMinAggregate {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
}
export declare class ChatSessionMinOrderByAggregateInput {
    id?: `${SortOrder}`;
    title?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    userId?: `${SortOrder}`;
}
export declare class ChatSessionOrderByRelationAggregateInput {
    _count?: `${SortOrder}`;
}
export declare class ChatSessionOrderByWithAggregationInput {
    id?: `${SortOrder}`;
    title?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    userId?: `${SortOrder}`;
    _count?: InstanceType<typeof ChatSessionCountOrderByAggregateInput>;
    _avg?: InstanceType<typeof ChatSessionAvgOrderByAggregateInput>;
    _max?: InstanceType<typeof ChatSessionMaxOrderByAggregateInput>;
    _min?: InstanceType<typeof ChatSessionMinOrderByAggregateInput>;
    _sum?: InstanceType<typeof ChatSessionSumOrderByAggregateInput>;
}
export declare class ChatSessionOrderByWithRelationInput {
    id?: `${SortOrder}`;
    title?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    userId?: `${SortOrder}`;
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    messages?: InstanceType<typeof MessageOrderByRelationAggregateInput>;
}
export declare class ChatSessionScalarRelationFilter {
    is?: InstanceType<typeof ChatSessionWhereInput>;
    isNot?: InstanceType<typeof ChatSessionWhereInput>;
}
export declare class ChatSessionScalarWhereWithAggregatesInput {
    AND?: Array<ChatSessionScalarWhereWithAggregatesInput>;
    OR?: Array<ChatSessionScalarWhereWithAggregatesInput>;
    NOT?: Array<ChatSessionScalarWhereWithAggregatesInput>;
    id?: InstanceType<typeof IntWithAggregatesFilter>;
    title?: InstanceType<typeof StringWithAggregatesFilter>;
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    userId?: InstanceType<typeof IntWithAggregatesFilter>;
}
export declare class ChatSessionScalarWhereInput {
    AND?: Array<ChatSessionScalarWhereInput>;
    OR?: Array<ChatSessionScalarWhereInput>;
    NOT?: Array<ChatSessionScalarWhereInput>;
    id?: InstanceType<typeof IntFilter>;
    title?: InstanceType<typeof StringFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    userId?: InstanceType<typeof IntFilter>;
}
export declare class ChatSessionSumAggregateInput {
    id?: true;
    userId?: true;
}
export declare class ChatSessionSumAggregate {
    id?: number;
    userId?: number;
}
export declare class ChatSessionSumOrderByAggregateInput {
    id?: `${SortOrder}`;
    userId?: `${SortOrder}`;
}
export declare class ChatSessionUncheckedCreateNestedManyWithoutUserInput {
    create?: Array<ChatSessionCreateWithoutUserInput>;
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;
    createMany?: InstanceType<typeof ChatSessionCreateManyUserInputEnvelope>;
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
}
export declare class ChatSessionUncheckedCreateWithoutMessagesInput {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: number;
}
export declare class ChatSessionUncheckedCreateWithoutUserInput {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: InstanceType<typeof MessageUncheckedCreateNestedManyWithoutChatSessionInput>;
}
export declare class ChatSessionUncheckedCreateInput {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: number;
    messages?: InstanceType<typeof MessageUncheckedCreateNestedManyWithoutChatSessionInput>;
}
export declare class ChatSessionUncheckedUpdateManyWithoutUserNestedInput {
    create?: Array<ChatSessionCreateWithoutUserInput>;
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;
    upsert?: Array<ChatSessionUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: InstanceType<typeof ChatSessionCreateManyUserInputEnvelope>;
    set?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    disconnect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    delete?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    update?: Array<ChatSessionUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Array<ChatSessionUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Array<ChatSessionScalarWhereInput>;
}
export declare class ChatSessionUncheckedUpdateManyWithoutUserInput {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class ChatSessionUncheckedUpdateManyInput {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
}
export declare class ChatSessionUncheckedUpdateWithoutMessagesInput {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
}
export declare class ChatSessionUncheckedUpdateWithoutUserInput {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: InstanceType<typeof MessageUncheckedUpdateManyWithoutChatSessionNestedInput>;
}
export declare class ChatSessionUncheckedUpdateInput {
    id?: number;
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
    messages?: InstanceType<typeof MessageUncheckedUpdateManyWithoutChatSessionNestedInput>;
}
export declare class ChatSessionUpdateManyMutationInput {
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class ChatSessionUpdateManyWithWhereWithoutUserInput {
    where: InstanceType<typeof ChatSessionScalarWhereInput>;
    data: InstanceType<typeof ChatSessionUpdateManyMutationInput>;
}
export declare class ChatSessionUpdateManyWithoutUserNestedInput {
    create?: Array<ChatSessionCreateWithoutUserInput>;
    connectOrCreate?: Array<ChatSessionCreateOrConnectWithoutUserInput>;
    upsert?: Array<ChatSessionUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: InstanceType<typeof ChatSessionCreateManyUserInputEnvelope>;
    set?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    disconnect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    delete?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    connect?: Array<Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>>;
    update?: Array<ChatSessionUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Array<ChatSessionUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Array<ChatSessionScalarWhereInput>;
}
export declare class ChatSessionUpdateOneRequiredWithoutMessagesNestedInput {
    create?: InstanceType<typeof ChatSessionCreateWithoutMessagesInput>;
    connectOrCreate?: InstanceType<typeof ChatSessionCreateOrConnectWithoutMessagesInput>;
    upsert?: InstanceType<typeof ChatSessionUpsertWithoutMessagesInput>;
    connect?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    update?: InstanceType<typeof ChatSessionUpdateToOneWithWhereWithoutMessagesInput>;
}
export declare class ChatSessionUpdateToOneWithWhereWithoutMessagesInput {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    data: InstanceType<typeof ChatSessionUpdateWithoutMessagesInput>;
}
export declare class ChatSessionUpdateWithWhereUniqueWithoutUserInput {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    data: InstanceType<typeof ChatSessionUpdateWithoutUserInput>;
}
export declare class ChatSessionUpdateWithoutMessagesInput {
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutChatSessionsNestedInput>;
}
export declare class ChatSessionUpdateWithoutUserInput {
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: InstanceType<typeof MessageUpdateManyWithoutChatSessionNestedInput>;
}
export declare class ChatSessionUpdateInput {
    title?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutChatSessionsNestedInput>;
    messages?: InstanceType<typeof MessageUpdateManyWithoutChatSessionNestedInput>;
}
export declare class ChatSessionUpsertWithWhereUniqueWithoutUserInput {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    update: InstanceType<typeof ChatSessionUpdateWithoutUserInput>;
    create: InstanceType<typeof ChatSessionCreateWithoutUserInput>;
}
export declare class ChatSessionUpsertWithoutMessagesInput {
    update: InstanceType<typeof ChatSessionUpdateWithoutMessagesInput>;
    create: InstanceType<typeof ChatSessionCreateWithoutMessagesInput>;
    where?: InstanceType<typeof ChatSessionWhereInput>;
}
export declare class ChatSessionWhereUniqueInput {
    id?: number;
    AND?: Array<ChatSessionWhereInput>;
    OR?: Array<ChatSessionWhereInput>;
    NOT?: Array<ChatSessionWhereInput>;
    title?: InstanceType<typeof StringFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    userId?: InstanceType<typeof IntFilter>;
    user?: InstanceType<typeof UserScalarRelationFilter>;
    messages?: InstanceType<typeof MessageListRelationFilter>;
}
export declare class ChatSessionWhereInput {
    AND?: Array<ChatSessionWhereInput>;
    OR?: Array<ChatSessionWhereInput>;
    NOT?: Array<ChatSessionWhereInput>;
    id?: InstanceType<typeof IntFilter>;
    title?: InstanceType<typeof StringFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    userId?: InstanceType<typeof IntFilter>;
    user?: InstanceType<typeof UserScalarRelationFilter>;
    messages?: InstanceType<typeof MessageListRelationFilter>;
}
export declare class ChatSession {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    user?: InstanceType<typeof User>;
    messages?: Array<Message>;
    _count?: InstanceType<typeof ChatSessionCount>;
}
export declare class CreateManyChatSessionArgs {
    data: Array<ChatSessionCreateManyInput>;
    skipDuplicates?: boolean;
}
export declare class CreateOneChatSessionArgs {
    data: InstanceType<typeof ChatSessionCreateInput>;
}
export declare class DeleteManyChatSessionArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
}
export declare class DeleteOneChatSessionArgs {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
export declare class FindFirstChatSessionOrThrowArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${ChatSessionScalarFieldEnum}`>;
}
export declare class FindFirstChatSessionArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${ChatSessionScalarFieldEnum}`>;
}
export declare class FindManyChatSessionArgs {
    where?: InstanceType<typeof ChatSessionWhereInput>;
    orderBy?: Array<ChatSessionOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${ChatSessionScalarFieldEnum}`>;
}
export declare class FindUniqueChatSessionOrThrowArgs {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
export declare class FindUniqueChatSessionArgs {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
export declare class UpdateManyChatSessionArgs {
    data: InstanceType<typeof ChatSessionUpdateManyMutationInput>;
    where?: InstanceType<typeof ChatSessionWhereInput>;
}
export declare class UpdateOneChatSessionArgs {
    data: InstanceType<typeof ChatSessionUpdateInput>;
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
}
export declare class UpsertOneChatSessionArgs {
    where: Prisma.AtLeast<ChatSessionWhereUniqueInput, 'id'>;
    create: InstanceType<typeof ChatSessionCreateInput>;
    update: InstanceType<typeof ChatSessionUpdateInput>;
}
export declare class AggregateMessage {
    _count?: InstanceType<typeof MessageCountAggregate>;
    _avg?: InstanceType<typeof MessageAvgAggregate>;
    _sum?: InstanceType<typeof MessageSumAggregate>;
    _min?: InstanceType<typeof MessageMinAggregate>;
    _max?: InstanceType<typeof MessageMaxAggregate>;
}
export declare class CreateManyMessageArgs {
    data: Array<MessageCreateManyInput>;
    skipDuplicates?: boolean;
}
export declare class CreateOneMessageArgs {
    data: InstanceType<typeof MessageCreateInput>;
}
export declare class DeleteManyMessageArgs {
    where?: InstanceType<typeof MessageWhereInput>;
}
export declare class DeleteOneMessageArgs {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
}
export declare class FindFirstMessageOrThrowArgs {
    where?: InstanceType<typeof MessageWhereInput>;
    orderBy?: Array<MessageOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${MessageScalarFieldEnum}`>;
}
export declare class FindFirstMessageArgs {
    where?: InstanceType<typeof MessageWhereInput>;
    orderBy?: Array<MessageOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${MessageScalarFieldEnum}`>;
}
export declare class FindManyMessageArgs {
    where?: InstanceType<typeof MessageWhereInput>;
    orderBy?: Array<MessageOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${MessageScalarFieldEnum}`>;
}
export declare class FindUniqueMessageOrThrowArgs {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
}
export declare class FindUniqueMessageArgs {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
}
export declare class MessageAggregateArgs {
    where?: InstanceType<typeof MessageWhereInput>;
    orderBy?: Array<MessageOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof MessageCountAggregateInput>;
    _avg?: InstanceType<typeof MessageAvgAggregateInput>;
    _sum?: InstanceType<typeof MessageSumAggregateInput>;
    _min?: InstanceType<typeof MessageMinAggregateInput>;
    _max?: InstanceType<typeof MessageMaxAggregateInput>;
}
export declare class MessageAvgAggregateInput {
    id?: true;
    chatSessionId?: true;
}
export declare class MessageAvgAggregate {
    id?: number;
    chatSessionId?: number;
}
export declare class MessageAvgOrderByAggregateInput {
    id?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
}
export declare class MessageCountAggregateInput {
    id?: true;
    sender?: true;
    type?: true;
    content?: true;
    payload?: true;
    timestamp?: true;
    createdAt?: true;
    updatedAt?: true;
    chatSessionId?: true;
    _all?: true;
}
export declare class MessageCountAggregate {
    id: number;
    sender: number;
    type: number;
    content: number;
    payload: number;
    timestamp: number;
    createdAt: number;
    updatedAt: number;
    chatSessionId: number;
    _all: number;
}
export declare class MessageCountOrderByAggregateInput {
    id?: `${SortOrder}`;
    sender?: `${SortOrder}`;
    type?: `${SortOrder}`;
    content?: `${SortOrder}`;
    payload?: `${SortOrder}`;
    timestamp?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
}
export declare class MessageCreateManyChatSessionInputEnvelope {
    data: Array<MessageCreateManyChatSessionInput>;
    skipDuplicates?: boolean;
}
export declare class MessageCreateManyChatSessionInput {
    id?: number;
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageCreateManyInput {
    id?: number;
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId: number;
}
export declare class MessageCreateNestedManyWithoutChatSessionInput {
    create?: Array<MessageCreateWithoutChatSessionInput>;
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;
    createMany?: InstanceType<typeof MessageCreateManyChatSessionInputEnvelope>;
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
}
export declare class MessageCreateOrConnectWithoutChatSessionInput {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    create: InstanceType<typeof MessageCreateWithoutChatSessionInput>;
}
export declare class MessageCreateWithoutChatSessionInput {
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageCreateInput {
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSession: InstanceType<typeof ChatSessionCreateNestedOneWithoutMessagesInput>;
}
export declare class MessageGroupByArgs {
    where?: InstanceType<typeof MessageWhereInput>;
    orderBy?: Array<MessageOrderByWithAggregationInput>;
    by: Array<`${MessageScalarFieldEnum}`>;
    having?: InstanceType<typeof MessageScalarWhereWithAggregatesInput>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof MessageCountAggregateInput>;
    _avg?: InstanceType<typeof MessageAvgAggregateInput>;
    _sum?: InstanceType<typeof MessageSumAggregateInput>;
    _min?: InstanceType<typeof MessageMinAggregateInput>;
    _max?: InstanceType<typeof MessageMaxAggregateInput>;
}
export declare class MessageGroupBy {
    id: number;
    sender: string;
    type: string;
    content?: string;
    payload?: any;
    timestamp: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
    chatSessionId: number;
    _count?: InstanceType<typeof MessageCountAggregate>;
    _avg?: InstanceType<typeof MessageAvgAggregate>;
    _sum?: InstanceType<typeof MessageSumAggregate>;
    _min?: InstanceType<typeof MessageMinAggregate>;
    _max?: InstanceType<typeof MessageMaxAggregate>;
}
export declare class MessageListRelationFilter {
    every?: InstanceType<typeof MessageWhereInput>;
    some?: InstanceType<typeof MessageWhereInput>;
    none?: InstanceType<typeof MessageWhereInput>;
}
export declare class MessageMaxAggregateInput {
    id?: true;
    sender?: true;
    type?: true;
    content?: true;
    timestamp?: true;
    createdAt?: true;
    updatedAt?: true;
    chatSessionId?: true;
}
export declare class MessageMaxAggregate {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId?: number;
}
export declare class MessageMaxOrderByAggregateInput {
    id?: `${SortOrder}`;
    sender?: `${SortOrder}`;
    type?: `${SortOrder}`;
    content?: `${SortOrder}`;
    timestamp?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
}
export declare class MessageMinAggregateInput {
    id?: true;
    sender?: true;
    type?: true;
    content?: true;
    timestamp?: true;
    createdAt?: true;
    updatedAt?: true;
    chatSessionId?: true;
}
export declare class MessageMinAggregate {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId?: number;
}
export declare class MessageMinOrderByAggregateInput {
    id?: `${SortOrder}`;
    sender?: `${SortOrder}`;
    type?: `${SortOrder}`;
    content?: `${SortOrder}`;
    timestamp?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
}
export declare class MessageOrderByRelationAggregateInput {
    _count?: `${SortOrder}`;
}
export declare class MessageOrderByWithAggregationInput {
    id?: `${SortOrder}`;
    sender?: `${SortOrder}`;
    type?: `${SortOrder}`;
    content?: InstanceType<typeof SortOrderInput>;
    payload?: InstanceType<typeof SortOrderInput>;
    timestamp?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
    _count?: InstanceType<typeof MessageCountOrderByAggregateInput>;
    _avg?: InstanceType<typeof MessageAvgOrderByAggregateInput>;
    _max?: InstanceType<typeof MessageMaxOrderByAggregateInput>;
    _min?: InstanceType<typeof MessageMinOrderByAggregateInput>;
    _sum?: InstanceType<typeof MessageSumOrderByAggregateInput>;
}
export declare class MessageOrderByWithRelationInput {
    id?: `${SortOrder}`;
    sender?: `${SortOrder}`;
    type?: `${SortOrder}`;
    content?: InstanceType<typeof SortOrderInput>;
    payload?: InstanceType<typeof SortOrderInput>;
    timestamp?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
    chatSession?: InstanceType<typeof ChatSessionOrderByWithRelationInput>;
}
export declare class MessageScalarWhereWithAggregatesInput {
    AND?: Array<MessageScalarWhereWithAggregatesInput>;
    OR?: Array<MessageScalarWhereWithAggregatesInput>;
    NOT?: Array<MessageScalarWhereWithAggregatesInput>;
    id?: InstanceType<typeof IntWithAggregatesFilter>;
    sender?: InstanceType<typeof StringWithAggregatesFilter>;
    type?: InstanceType<typeof StringWithAggregatesFilter>;
    content?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    payload?: InstanceType<typeof JsonNullableWithAggregatesFilter>;
    timestamp?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    chatSessionId?: InstanceType<typeof IntWithAggregatesFilter>;
}
export declare class MessageScalarWhereInput {
    AND?: Array<MessageScalarWhereInput>;
    OR?: Array<MessageScalarWhereInput>;
    NOT?: Array<MessageScalarWhereInput>;
    id?: InstanceType<typeof IntFilter>;
    sender?: InstanceType<typeof StringFilter>;
    type?: InstanceType<typeof StringFilter>;
    content?: InstanceType<typeof StringNullableFilter>;
    payload?: InstanceType<typeof JsonNullableFilter>;
    timestamp?: InstanceType<typeof DateTimeFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    chatSessionId?: InstanceType<typeof IntFilter>;
}
export declare class MessageSumAggregateInput {
    id?: true;
    chatSessionId?: true;
}
export declare class MessageSumAggregate {
    id?: number;
    chatSessionId?: number;
}
export declare class MessageSumOrderByAggregateInput {
    id?: `${SortOrder}`;
    chatSessionId?: `${SortOrder}`;
}
export declare class MessageUncheckedCreateNestedManyWithoutChatSessionInput {
    create?: Array<MessageCreateWithoutChatSessionInput>;
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;
    createMany?: InstanceType<typeof MessageCreateManyChatSessionInputEnvelope>;
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
}
export declare class MessageUncheckedCreateWithoutChatSessionInput {
    id?: number;
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageUncheckedCreateInput {
    id?: number;
    sender: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId: number;
}
export declare class MessageUncheckedUpdateManyWithoutChatSessionNestedInput {
    create?: Array<MessageCreateWithoutChatSessionInput>;
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;
    upsert?: Array<MessageUpsertWithWhereUniqueWithoutChatSessionInput>;
    createMany?: InstanceType<typeof MessageCreateManyChatSessionInputEnvelope>;
    set?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    disconnect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    delete?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    update?: Array<MessageUpdateWithWhereUniqueWithoutChatSessionInput>;
    updateMany?: Array<MessageUpdateManyWithWhereWithoutChatSessionInput>;
    deleteMany?: Array<MessageScalarWhereInput>;
}
export declare class MessageUncheckedUpdateManyWithoutChatSessionInput {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageUncheckedUpdateManyInput {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId?: number;
}
export declare class MessageUncheckedUpdateWithoutChatSessionInput {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageUncheckedUpdateInput {
    id?: number;
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessionId?: number;
}
export declare class MessageUpdateManyMutationInput {
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageUpdateManyWithWhereWithoutChatSessionInput {
    where: InstanceType<typeof MessageScalarWhereInput>;
    data: InstanceType<typeof MessageUpdateManyMutationInput>;
}
export declare class MessageUpdateManyWithoutChatSessionNestedInput {
    create?: Array<MessageCreateWithoutChatSessionInput>;
    connectOrCreate?: Array<MessageCreateOrConnectWithoutChatSessionInput>;
    upsert?: Array<MessageUpsertWithWhereUniqueWithoutChatSessionInput>;
    createMany?: InstanceType<typeof MessageCreateManyChatSessionInputEnvelope>;
    set?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    disconnect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    delete?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    connect?: Array<Prisma.AtLeast<MessageWhereUniqueInput, 'id'>>;
    update?: Array<MessageUpdateWithWhereUniqueWithoutChatSessionInput>;
    updateMany?: Array<MessageUpdateManyWithWhereWithoutChatSessionInput>;
    deleteMany?: Array<MessageScalarWhereInput>;
}
export declare class MessageUpdateWithWhereUniqueWithoutChatSessionInput {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    data: InstanceType<typeof MessageUpdateWithoutChatSessionInput>;
}
export declare class MessageUpdateWithoutChatSessionInput {
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class MessageUpdateInput {
    sender?: string;
    type?: string;
    content?: string;
    payload?: any;
    timestamp?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSession?: InstanceType<typeof ChatSessionUpdateOneRequiredWithoutMessagesNestedInput>;
}
export declare class MessageUpsertWithWhereUniqueWithoutChatSessionInput {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    update: InstanceType<typeof MessageUpdateWithoutChatSessionInput>;
    create: InstanceType<typeof MessageCreateWithoutChatSessionInput>;
}
export declare class MessageWhereUniqueInput {
    id?: number;
    AND?: Array<MessageWhereInput>;
    OR?: Array<MessageWhereInput>;
    NOT?: Array<MessageWhereInput>;
    sender?: InstanceType<typeof StringFilter>;
    type?: InstanceType<typeof StringFilter>;
    content?: InstanceType<typeof StringNullableFilter>;
    payload?: InstanceType<typeof JsonNullableFilter>;
    timestamp?: InstanceType<typeof DateTimeFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    chatSessionId?: InstanceType<typeof IntFilter>;
    chatSession?: InstanceType<typeof ChatSessionScalarRelationFilter>;
}
export declare class MessageWhereInput {
    AND?: Array<MessageWhereInput>;
    OR?: Array<MessageWhereInput>;
    NOT?: Array<MessageWhereInput>;
    id?: InstanceType<typeof IntFilter>;
    sender?: InstanceType<typeof StringFilter>;
    type?: InstanceType<typeof StringFilter>;
    content?: InstanceType<typeof StringNullableFilter>;
    payload?: InstanceType<typeof JsonNullableFilter>;
    timestamp?: InstanceType<typeof DateTimeFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    chatSessionId?: InstanceType<typeof IntFilter>;
    chatSession?: InstanceType<typeof ChatSessionScalarRelationFilter>;
}
export declare class Message {
    id: number;
    sender: string;
    type: string;
    content: string | null;
    payload: any | null;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
    chatSessionId: number;
    chatSession?: InstanceType<typeof ChatSession>;
}
export declare class UpdateManyMessageArgs {
    data: InstanceType<typeof MessageUpdateManyMutationInput>;
    where?: InstanceType<typeof MessageWhereInput>;
}
export declare class UpdateOneMessageArgs {
    data: InstanceType<typeof MessageUpdateInput>;
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
}
export declare class UpsertOneMessageArgs {
    where: Prisma.AtLeast<MessageWhereUniqueInput, 'id'>;
    create: InstanceType<typeof MessageCreateInput>;
    update: InstanceType<typeof MessageUpdateInput>;
}
export declare class AffectedRows {
    count: number;
}
export declare class DateTimeFilter {
    equals?: Date | string;
    in?: Array<Date> | Array<string>;
    notIn?: Array<Date> | Array<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: InstanceType<typeof NestedDateTimeFilter>;
}
export declare class DateTimeWithAggregatesFilter {
    equals?: Date | string;
    in?: Array<Date> | Array<string>;
    notIn?: Array<Date> | Array<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}
export declare class EnumUserRoleFilter {
    equals?: `${UserRole}`;
    in?: Array<`${UserRole}`>;
    notIn?: Array<`${UserRole}`>;
    not?: InstanceType<typeof NestedEnumUserRoleFilter>;
}
export declare class EnumUserRoleWithAggregatesFilter {
    equals?: `${UserRole}`;
    in?: Array<`${UserRole}`>;
    notIn?: Array<`${UserRole}`>;
    not?: InstanceType<typeof NestedEnumUserRoleWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedEnumUserRoleFilter>;
    _max?: InstanceType<typeof NestedEnumUserRoleFilter>;
}
export declare class IntFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedIntFilter>;
}
export declare class IntWithAggregatesFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _avg?: InstanceType<typeof NestedFloatFilter>;
    _sum?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedIntFilter>;
    _max?: InstanceType<typeof NestedIntFilter>;
}
export declare class JsonNullableFilter {
    equals?: any;
    path?: Array<string>;
    string_contains?: string;
    string_starts_with?: string;
    string_ends_with?: string;
    array_contains?: any;
    array_starts_with?: any;
    array_ends_with?: any;
    lt?: any;
    lte?: any;
    gt?: any;
    gte?: any;
    not?: any;
}
export declare class JsonNullableWithAggregatesFilter {
    equals?: any;
    path?: Array<string>;
    string_contains?: string;
    string_starts_with?: string;
    string_ends_with?: string;
    array_contains?: any;
    array_starts_with?: any;
    array_ends_with?: any;
    lt?: any;
    lte?: any;
    gt?: any;
    gte?: any;
    not?: any;
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    _min?: InstanceType<typeof NestedJsonNullableFilter>;
    _max?: InstanceType<typeof NestedJsonNullableFilter>;
}
export declare class NestedDateTimeFilter {
    equals?: Date | string;
    in?: Array<Date> | Array<string>;
    notIn?: Array<Date> | Array<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: InstanceType<typeof NestedDateTimeFilter>;
}
export declare class NestedDateTimeWithAggregatesFilter {
    equals?: Date | string;
    in?: Array<Date> | Array<string>;
    notIn?: Array<Date> | Array<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}
export declare class NestedEnumUserRoleFilter {
    equals?: `${UserRole}`;
    in?: Array<`${UserRole}`>;
    notIn?: Array<`${UserRole}`>;
    not?: InstanceType<typeof NestedEnumUserRoleFilter>;
}
export declare class NestedEnumUserRoleWithAggregatesFilter {
    equals?: `${UserRole}`;
    in?: Array<`${UserRole}`>;
    notIn?: Array<`${UserRole}`>;
    not?: InstanceType<typeof NestedEnumUserRoleWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedEnumUserRoleFilter>;
    _max?: InstanceType<typeof NestedEnumUserRoleFilter>;
}
export declare class NestedFloatFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedFloatFilter>;
}
export declare class NestedIntFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedIntFilter>;
}
export declare class NestedIntNullableFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedIntNullableFilter>;
}
export declare class NestedIntWithAggregatesFilter {
    equals?: number;
    in?: Array<number>;
    notIn?: Array<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _avg?: InstanceType<typeof NestedFloatFilter>;
    _sum?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedIntFilter>;
    _max?: InstanceType<typeof NestedIntFilter>;
}
export declare class NestedJsonNullableFilter {
    equals?: any;
    path?: Array<string>;
    string_contains?: string;
    string_starts_with?: string;
    string_ends_with?: string;
    array_contains?: any;
    array_starts_with?: any;
    array_ends_with?: any;
    lt?: any;
    lte?: any;
    gt?: any;
    gte?: any;
    not?: any;
}
export declare class NestedStringFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: InstanceType<typeof NestedStringFilter>;
}
export declare class NestedStringNullableFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: InstanceType<typeof NestedStringNullableFilter>;
}
export declare class NestedStringNullableWithAggregatesFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}
export declare class NestedStringWithAggregatesFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedStringFilter>;
    _max?: InstanceType<typeof NestedStringFilter>;
}
export declare class SortOrderInput {
    sort: `${SortOrder}`;
    nulls?: `${NullsOrder}`;
}
export declare class StringFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: `${QueryMode}`;
    not?: InstanceType<typeof NestedStringFilter>;
}
export declare class StringNullableFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: `${QueryMode}`;
    not?: InstanceType<typeof NestedStringNullableFilter>;
}
export declare class StringNullableWithAggregatesFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: `${QueryMode}`;
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}
export declare class StringWithAggregatesFilter {
    equals?: string;
    in?: Array<string>;
    notIn?: Array<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: `${QueryMode}`;
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    _count?: InstanceType<typeof NestedIntFilter>;
    _min?: InstanceType<typeof NestedStringFilter>;
    _max?: InstanceType<typeof NestedStringFilter>;
}
export declare class AggregateUser {
    _count?: InstanceType<typeof UserCountAggregate>;
    _avg?: InstanceType<typeof UserAvgAggregate>;
    _sum?: InstanceType<typeof UserSumAggregate>;
    _min?: InstanceType<typeof UserMinAggregate>;
    _max?: InstanceType<typeof UserMaxAggregate>;
}
export declare class CreateManyUserArgs {
    data: Array<UserCreateManyInput>;
    skipDuplicates?: boolean;
}
export declare class CreateOneUserArgs {
    data: InstanceType<typeof UserCreateInput>;
}
export declare class DeleteManyUserArgs {
    where?: InstanceType<typeof UserWhereInput>;
}
export declare class DeleteOneUserArgs {
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
export declare class FindFirstUserOrThrowArgs {
    where?: InstanceType<typeof UserWhereInput>;
    orderBy?: Array<UserOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${UserScalarFieldEnum}`>;
}
export declare class FindFirstUserArgs {
    where?: InstanceType<typeof UserWhereInput>;
    orderBy?: Array<UserOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${UserScalarFieldEnum}`>;
}
export declare class FindManyUserArgs {
    where?: InstanceType<typeof UserWhereInput>;
    orderBy?: Array<UserOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    take?: number;
    skip?: number;
    distinct?: Array<`${UserScalarFieldEnum}`>;
}
export declare class FindUniqueUserOrThrowArgs {
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
export declare class FindUniqueUserArgs {
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
export declare class UpdateManyUserArgs {
    data: InstanceType<typeof UserUpdateManyMutationInput>;
    where?: InstanceType<typeof UserWhereInput>;
}
export declare class UpdateOneUserArgs {
    data: InstanceType<typeof UserUpdateInput>;
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
export declare class UpsertOneUserArgs {
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    create: InstanceType<typeof UserCreateInput>;
    update: InstanceType<typeof UserUpdateInput>;
}
export declare class UserAggregateArgs {
    where?: InstanceType<typeof UserWhereInput>;
    orderBy?: Array<UserOrderByWithRelationInput>;
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof UserCountAggregateInput>;
    _avg?: InstanceType<typeof UserAvgAggregateInput>;
    _sum?: InstanceType<typeof UserSumAggregateInput>;
    _min?: InstanceType<typeof UserMinAggregateInput>;
    _max?: InstanceType<typeof UserMaxAggregateInput>;
}
export declare class UserAvgAggregateInput {
    id?: true;
}
export declare class UserAvgAggregate {
    id?: number;
}
export declare class UserAvgOrderByAggregateInput {
    id?: `${SortOrder}`;
}
export declare class UserCountAggregateInput {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
}
export declare class UserCountAggregate {
    id: number;
    email: number;
    password: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
}
export declare class UserCountOrderByAggregateInput {
    id?: `${SortOrder}`;
    email?: `${SortOrder}`;
    password?: `${SortOrder}`;
    role?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
}
export declare class UserCount {
    chatSessions?: number;
}
export declare class UserCreateManyInput {
    id?: number;
    email: string;
    password: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserCreateNestedOneWithoutChatSessionsInput {
    create?: InstanceType<typeof UserCreateWithoutChatSessionsInput>;
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutChatSessionsInput>;
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
export declare class UserCreateOrConnectWithoutChatSessionsInput {
    where: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    create: InstanceType<typeof UserCreateWithoutChatSessionsInput>;
}
export declare class UserCreateWithoutChatSessionsInput {
    email: string;
    password: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserCreateInput {
    email: string;
    password: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessions?: InstanceType<typeof ChatSessionCreateNestedManyWithoutUserInput>;
}
export declare class UserGroupByArgs {
    where?: InstanceType<typeof UserWhereInput>;
    orderBy?: Array<UserOrderByWithAggregationInput>;
    by: Array<`${UserScalarFieldEnum}`>;
    having?: InstanceType<typeof UserScalarWhereWithAggregatesInput>;
    take?: number;
    skip?: number;
    _count?: InstanceType<typeof UserCountAggregateInput>;
    _avg?: InstanceType<typeof UserAvgAggregateInput>;
    _sum?: InstanceType<typeof UserSumAggregateInput>;
    _min?: InstanceType<typeof UserMinAggregateInput>;
    _max?: InstanceType<typeof UserMaxAggregateInput>;
}
export declare class UserGroupBy {
    id: number;
    email: string;
    password: string;
    role: `${UserRole}`;
    createdAt: Date | string;
    updatedAt: Date | string;
    _count?: InstanceType<typeof UserCountAggregate>;
    _avg?: InstanceType<typeof UserAvgAggregate>;
    _sum?: InstanceType<typeof UserSumAggregate>;
    _min?: InstanceType<typeof UserMinAggregate>;
    _max?: InstanceType<typeof UserMaxAggregate>;
}
export declare class UserMaxAggregateInput {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
}
export declare class UserMaxAggregate {
    id?: number;
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserMaxOrderByAggregateInput {
    id?: `${SortOrder}`;
    email?: `${SortOrder}`;
    password?: `${SortOrder}`;
    role?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
}
export declare class UserMinAggregateInput {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
}
export declare class UserMinAggregate {
    id?: number;
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserMinOrderByAggregateInput {
    id?: `${SortOrder}`;
    email?: `${SortOrder}`;
    password?: `${SortOrder}`;
    role?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
}
export declare class UserOrderByWithAggregationInput {
    id?: `${SortOrder}`;
    email?: `${SortOrder}`;
    password?: `${SortOrder}`;
    role?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    _count?: InstanceType<typeof UserCountOrderByAggregateInput>;
    _avg?: InstanceType<typeof UserAvgOrderByAggregateInput>;
    _max?: InstanceType<typeof UserMaxOrderByAggregateInput>;
    _min?: InstanceType<typeof UserMinOrderByAggregateInput>;
    _sum?: InstanceType<typeof UserSumOrderByAggregateInput>;
}
export declare class UserOrderByWithRelationInput {
    id?: `${SortOrder}`;
    email?: `${SortOrder}`;
    password?: `${SortOrder}`;
    role?: `${SortOrder}`;
    createdAt?: `${SortOrder}`;
    updatedAt?: `${SortOrder}`;
    chatSessions?: InstanceType<typeof ChatSessionOrderByRelationAggregateInput>;
}
export declare class UserScalarRelationFilter {
    is?: InstanceType<typeof UserWhereInput>;
    isNot?: InstanceType<typeof UserWhereInput>;
}
export declare class UserScalarWhereWithAggregatesInput {
    AND?: Array<UserScalarWhereWithAggregatesInput>;
    OR?: Array<UserScalarWhereWithAggregatesInput>;
    NOT?: Array<UserScalarWhereWithAggregatesInput>;
    id?: InstanceType<typeof IntWithAggregatesFilter>;
    email?: InstanceType<typeof StringWithAggregatesFilter>;
    password?: InstanceType<typeof StringWithAggregatesFilter>;
    role?: InstanceType<typeof EnumUserRoleWithAggregatesFilter>;
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
}
export declare class UserSumAggregateInput {
    id?: true;
}
export declare class UserSumAggregate {
    id?: number;
}
export declare class UserSumOrderByAggregateInput {
    id?: `${SortOrder}`;
}
export declare class UserUncheckedCreateWithoutChatSessionsInput {
    id?: number;
    email: string;
    password: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserUncheckedCreateInput {
    id?: number;
    email: string;
    password: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessions?: InstanceType<typeof ChatSessionUncheckedCreateNestedManyWithoutUserInput>;
}
export declare class UserUncheckedUpdateManyInput {
    id?: number;
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserUncheckedUpdateWithoutChatSessionsInput {
    id?: number;
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserUncheckedUpdateInput {
    id?: number;
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessions?: InstanceType<typeof ChatSessionUncheckedUpdateManyWithoutUserNestedInput>;
}
export declare class UserUpdateManyMutationInput {
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserUpdateOneRequiredWithoutChatSessionsNestedInput {
    create?: InstanceType<typeof UserCreateWithoutChatSessionsInput>;
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutChatSessionsInput>;
    upsert?: InstanceType<typeof UserUpsertWithoutChatSessionsInput>;
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutChatSessionsInput>;
}
export declare class UserUpdateToOneWithWhereWithoutChatSessionsInput {
    where?: InstanceType<typeof UserWhereInput>;
    data: InstanceType<typeof UserUpdateWithoutChatSessionsInput>;
}
export declare class UserUpdateWithoutChatSessionsInput {
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export declare class UserUpdateInput {
    email?: string;
    password?: string;
    role?: `${UserRole}`;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatSessions?: InstanceType<typeof ChatSessionUpdateManyWithoutUserNestedInput>;
}
export declare class UserUpsertWithoutChatSessionsInput {
    update: InstanceType<typeof UserUpdateWithoutChatSessionsInput>;
    create: InstanceType<typeof UserCreateWithoutChatSessionsInput>;
    where?: InstanceType<typeof UserWhereInput>;
}
export declare class UserWhereUniqueInput {
    id?: number;
    email?: string;
    AND?: Array<UserWhereInput>;
    OR?: Array<UserWhereInput>;
    NOT?: Array<UserWhereInput>;
    password?: InstanceType<typeof StringFilter>;
    role?: InstanceType<typeof EnumUserRoleFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    chatSessions?: InstanceType<typeof ChatSessionListRelationFilter>;
}
export declare class UserWhereInput {
    AND?: Array<UserWhereInput>;
    OR?: Array<UserWhereInput>;
    NOT?: Array<UserWhereInput>;
    id?: InstanceType<typeof IntFilter>;
    email?: InstanceType<typeof StringFilter>;
    password?: InstanceType<typeof StringFilter>;
    role?: InstanceType<typeof EnumUserRoleFilter>;
    createdAt?: InstanceType<typeof DateTimeFilter>;
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    chatSessions?: InstanceType<typeof ChatSessionListRelationFilter>;
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: `${UserRole}`;
    createdAt: Date;
    updatedAt: Date;
    chatSessions?: Array<ChatSession>;
    _count?: InstanceType<typeof UserCount>;
}
