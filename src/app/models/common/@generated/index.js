var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ChatSessionScalarWhereWithAggregatesInput_1, ChatSessionScalarWhereInput_1, ChatSessionWhereInput_1, MessageScalarWhereWithAggregatesInput_1, MessageScalarWhereInput_1, MessageWhereInput_1, NestedDateTimeFilter_1, NestedDateTimeWithAggregatesFilter_1, NestedEnumUserRoleFilter_1, NestedEnumUserRoleWithAggregatesFilter_1, NestedFloatFilter_1, NestedIntFilter_1, NestedIntNullableFilter_1, NestedIntWithAggregatesFilter_1, NestedStringFilter_1, NestedStringNullableFilter_1, NestedStringNullableWithAggregatesFilter_1, NestedStringWithAggregatesFilter_1, UserScalarWhereWithAggregatesInput_1, UserWhereInput_1;
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import * as Validator from 'class-validator';
export var UserScalarFieldEnum;
(function (UserScalarFieldEnum) {
    UserScalarFieldEnum["id"] = "id";
    UserScalarFieldEnum["email"] = "email";
    UserScalarFieldEnum["password"] = "password";
    UserScalarFieldEnum["role"] = "role";
    UserScalarFieldEnum["createdAt"] = "createdAt";
    UserScalarFieldEnum["updatedAt"] = "updatedAt";
})(UserScalarFieldEnum || (UserScalarFieldEnum = {}));
export var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRole || (UserRole = {}));
export var TransactionIsolationLevel;
(function (TransactionIsolationLevel) {
    TransactionIsolationLevel["ReadUncommitted"] = "ReadUncommitted";
    TransactionIsolationLevel["ReadCommitted"] = "ReadCommitted";
    TransactionIsolationLevel["RepeatableRead"] = "RepeatableRead";
    TransactionIsolationLevel["Serializable"] = "Serializable";
})(TransactionIsolationLevel || (TransactionIsolationLevel = {}));
export var SortOrder;
(function (SortOrder) {
    SortOrder["asc"] = "asc";
    SortOrder["desc"] = "desc";
})(SortOrder || (SortOrder = {}));
export var QueryMode;
(function (QueryMode) {
    QueryMode["default"] = "default";
    QueryMode["insensitive"] = "insensitive";
})(QueryMode || (QueryMode = {}));
export var NullsOrder;
(function (NullsOrder) {
    NullsOrder["first"] = "first";
    NullsOrder["last"] = "last";
})(NullsOrder || (NullsOrder = {}));
export var NullableJsonNullValueInput;
(function (NullableJsonNullValueInput) {
    NullableJsonNullValueInput["DbNull"] = "DbNull";
    NullableJsonNullValueInput["JsonNull"] = "JsonNull";
})(NullableJsonNullValueInput || (NullableJsonNullValueInput = {}));
export var JsonNullValueFilter;
(function (JsonNullValueFilter) {
    JsonNullValueFilter["DbNull"] = "DbNull";
    JsonNullValueFilter["JsonNull"] = "JsonNull";
    JsonNullValueFilter["AnyNull"] = "AnyNull";
})(JsonNullValueFilter || (JsonNullValueFilter = {}));
export var MessageScalarFieldEnum;
(function (MessageScalarFieldEnum) {
    MessageScalarFieldEnum["id"] = "id";
    MessageScalarFieldEnum["sender"] = "sender";
    MessageScalarFieldEnum["type"] = "type";
    MessageScalarFieldEnum["content"] = "content";
    MessageScalarFieldEnum["payload"] = "payload";
    MessageScalarFieldEnum["timestamp"] = "timestamp";
    MessageScalarFieldEnum["createdAt"] = "createdAt";
    MessageScalarFieldEnum["updatedAt"] = "updatedAt";
    MessageScalarFieldEnum["chatSessionId"] = "chatSessionId";
})(MessageScalarFieldEnum || (MessageScalarFieldEnum = {}));
export var ChatSessionScalarFieldEnum;
(function (ChatSessionScalarFieldEnum) {
    ChatSessionScalarFieldEnum["id"] = "id";
    ChatSessionScalarFieldEnum["title"] = "title";
    ChatSessionScalarFieldEnum["createdAt"] = "createdAt";
    ChatSessionScalarFieldEnum["updatedAt"] = "updatedAt";
    ChatSessionScalarFieldEnum["userId"] = "userId";
})(ChatSessionScalarFieldEnum || (ChatSessionScalarFieldEnum = {}));
registerEnumType(ChatSessionScalarFieldEnum, { name: 'ChatSessionScalarFieldEnum', description: undefined });
registerEnumType(MessageScalarFieldEnum, { name: 'MessageScalarFieldEnum', description: undefined });
registerEnumType(JsonNullValueFilter, { name: 'JsonNullValueFilter', description: undefined });
registerEnumType(NullableJsonNullValueInput, { name: 'NullableJsonNullValueInput', description: undefined });
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined });
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined });
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined });
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined });
registerEnumType(UserRole, { name: 'UserRole', description: undefined });
registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined });
let AggregateChatSession = class AggregateChatSession {
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => ChatSessionCountAggregate, { nullable: true })
], AggregateChatSession.prototype, "_count", void 0);
__decorate([
    Field(() => ChatSessionAvgAggregate, { nullable: true })
], AggregateChatSession.prototype, "_avg", void 0);
__decorate([
    Field(() => ChatSessionSumAggregate, { nullable: true })
], AggregateChatSession.prototype, "_sum", void 0);
__decorate([
    Field(() => ChatSessionMinAggregate, { nullable: true })
], AggregateChatSession.prototype, "_min", void 0);
__decorate([
    Field(() => ChatSessionMaxAggregate, { nullable: true })
], AggregateChatSession.prototype, "_max", void 0);
AggregateChatSession = __decorate([
    ObjectType()
], AggregateChatSession);
export { AggregateChatSession };
let ChatSessionAggregateArgs = class ChatSessionAggregateArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], ChatSessionAggregateArgs.prototype, "where", void 0);
__decorate([
    Field(() => [ChatSessionOrderByWithRelationInput], { nullable: true })
], ChatSessionAggregateArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionAggregateArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionAggregateArgs.prototype, "skip", void 0);
__decorate([
    Field(() => ChatSessionCountAggregateInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "_count", void 0);
__decorate([
    Field(() => ChatSessionAvgAggregateInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => ChatSessionSumAggregateInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => ChatSessionMinAggregateInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "_min", void 0);
__decorate([
    Field(() => ChatSessionMaxAggregateInput, { nullable: true })
], ChatSessionAggregateArgs.prototype, "_max", void 0);
ChatSessionAggregateArgs = __decorate([
    ArgsType()
], ChatSessionAggregateArgs);
export { ChatSessionAggregateArgs };
let ChatSessionAvgAggregateInput = class ChatSessionAvgAggregateInput {
    id;
    userId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionAvgAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionAvgAggregateInput.prototype, "userId", void 0);
ChatSessionAvgAggregateInput = __decorate([
    InputType()
], ChatSessionAvgAggregateInput);
export { ChatSessionAvgAggregateInput };
let ChatSessionAvgAggregate = class ChatSessionAvgAggregate {
    id;
    userId;
};
__decorate([
    Field(() => Float, { nullable: true })
], ChatSessionAvgAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], ChatSessionAvgAggregate.prototype, "userId", void 0);
ChatSessionAvgAggregate = __decorate([
    ObjectType()
], ChatSessionAvgAggregate);
export { ChatSessionAvgAggregate };
let ChatSessionAvgOrderByAggregateInput = class ChatSessionAvgOrderByAggregateInput {
    id;
    userId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionAvgOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionAvgOrderByAggregateInput.prototype, "userId", void 0);
ChatSessionAvgOrderByAggregateInput = __decorate([
    InputType()
], ChatSessionAvgOrderByAggregateInput);
export { ChatSessionAvgOrderByAggregateInput };
let ChatSessionCountAggregateInput = class ChatSessionCountAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    _all;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "userId", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCountAggregateInput.prototype, "_all", void 0);
ChatSessionCountAggregateInput = __decorate([
    InputType()
], ChatSessionCountAggregateInput);
export { ChatSessionCountAggregateInput };
let ChatSessionCountAggregate = class ChatSessionCountAggregate {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    _all;
};
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "title", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "userId", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCountAggregate.prototype, "_all", void 0);
ChatSessionCountAggregate = __decorate([
    ObjectType()
], ChatSessionCountAggregate);
export { ChatSessionCountAggregate };
let ChatSessionCountOrderByAggregateInput = class ChatSessionCountOrderByAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionCountOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionCountOrderByAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionCountOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionCountOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionCountOrderByAggregateInput.prototype, "userId", void 0);
ChatSessionCountOrderByAggregateInput = __decorate([
    InputType()
], ChatSessionCountOrderByAggregateInput);
export { ChatSessionCountOrderByAggregateInput };
let ChatSessionCount = class ChatSessionCount {
    messages;
};
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCount.prototype, "messages", void 0);
ChatSessionCount = __decorate([
    ObjectType()
], ChatSessionCount);
export { ChatSessionCount };
let ChatSessionCreateManyUserInputEnvelope = class ChatSessionCreateManyUserInputEnvelope {
    data;
    skipDuplicates;
};
__decorate([
    Field(() => [ChatSessionCreateManyUserInput], { nullable: false }),
    Type(() => ChatSessionCreateManyUserInput)
], ChatSessionCreateManyUserInputEnvelope.prototype, "data", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionCreateManyUserInputEnvelope.prototype, "skipDuplicates", void 0);
ChatSessionCreateManyUserInputEnvelope = __decorate([
    InputType()
], ChatSessionCreateManyUserInputEnvelope);
export { ChatSessionCreateManyUserInputEnvelope };
let ChatSessionCreateManyUserInput = class ChatSessionCreateManyUserInput {
    id;
    title;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionCreateManyUserInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionCreateManyUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateManyUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateManyUserInput.prototype, "updatedAt", void 0);
ChatSessionCreateManyUserInput = __decorate([
    InputType()
], ChatSessionCreateManyUserInput);
export { ChatSessionCreateManyUserInput };
let ChatSessionCreateManyInput = class ChatSessionCreateManyInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionCreateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionCreateManyInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateManyInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionCreateManyInput.prototype, "userId", void 0);
ChatSessionCreateManyInput = __decorate([
    InputType()
], ChatSessionCreateManyInput);
export { ChatSessionCreateManyInput };
let ChatSessionCreateNestedManyWithoutUserInput = class ChatSessionCreateNestedManyWithoutUserInput {
    create;
    connectOrCreate;
    createMany;
    connect;
};
__decorate([
    Field(() => [ChatSessionCreateWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionCreateNestedManyWithoutUserInput.prototype, "create", void 0);
__decorate([
    Field(() => [ChatSessionCreateOrConnectWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutUserInput)
], ChatSessionCreateNestedManyWithoutUserInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => ChatSessionCreateManyUserInputEnvelope, { nullable: true }),
    Type(() => ChatSessionCreateManyUserInputEnvelope)
], ChatSessionCreateNestedManyWithoutUserInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionCreateNestedManyWithoutUserInput.prototype, "connect", void 0);
ChatSessionCreateNestedManyWithoutUserInput = __decorate([
    InputType()
], ChatSessionCreateNestedManyWithoutUserInput);
export { ChatSessionCreateNestedManyWithoutUserInput };
let ChatSessionCreateNestedOneWithoutMessagesInput = class ChatSessionCreateNestedOneWithoutMessagesInput {
    create;
    connectOrCreate;
    connect;
};
__decorate([
    Field(() => ChatSessionCreateWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionCreateWithoutMessagesInput)
], ChatSessionCreateNestedOneWithoutMessagesInput.prototype, "create", void 0);
__decorate([
    Field(() => ChatSessionCreateOrConnectWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutMessagesInput)
], ChatSessionCreateNestedOneWithoutMessagesInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionCreateNestedOneWithoutMessagesInput.prototype, "connect", void 0);
ChatSessionCreateNestedOneWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionCreateNestedOneWithoutMessagesInput);
export { ChatSessionCreateNestedOneWithoutMessagesInput };
let ChatSessionCreateOrConnectWithoutMessagesInput = class ChatSessionCreateOrConnectWithoutMessagesInput {
    where;
    create;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionCreateOrConnectWithoutMessagesInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionCreateWithoutMessagesInput, { nullable: false }),
    Type(() => ChatSessionCreateWithoutMessagesInput)
], ChatSessionCreateOrConnectWithoutMessagesInput.prototype, "create", void 0);
ChatSessionCreateOrConnectWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionCreateOrConnectWithoutMessagesInput);
export { ChatSessionCreateOrConnectWithoutMessagesInput };
let ChatSessionCreateOrConnectWithoutUserInput = class ChatSessionCreateOrConnectWithoutUserInput {
    where;
    create;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionCreateOrConnectWithoutUserInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionCreateWithoutUserInput, { nullable: false }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionCreateOrConnectWithoutUserInput.prototype, "create", void 0);
ChatSessionCreateOrConnectWithoutUserInput = __decorate([
    InputType()
], ChatSessionCreateOrConnectWithoutUserInput);
export { ChatSessionCreateOrConnectWithoutUserInput };
let ChatSessionCreateWithoutMessagesInput = class ChatSessionCreateWithoutMessagesInput {
    title;
    createdAt;
    updatedAt;
    user;
};
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionCreateWithoutMessagesInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateWithoutMessagesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateWithoutMessagesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserCreateNestedOneWithoutChatSessionsInput, { nullable: false })
], ChatSessionCreateWithoutMessagesInput.prototype, "user", void 0);
ChatSessionCreateWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionCreateWithoutMessagesInput);
export { ChatSessionCreateWithoutMessagesInput };
let ChatSessionCreateWithoutUserInput = class ChatSessionCreateWithoutUserInput {
    title;
    createdAt;
    updatedAt;
    messages;
};
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionCreateWithoutUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateWithoutUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateWithoutUserInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => MessageCreateNestedManyWithoutChatSessionInput, { nullable: true })
], ChatSessionCreateWithoutUserInput.prototype, "messages", void 0);
ChatSessionCreateWithoutUserInput = __decorate([
    InputType()
], ChatSessionCreateWithoutUserInput);
export { ChatSessionCreateWithoutUserInput };
let ChatSessionCreateInput = class ChatSessionCreateInput {
    title;
    createdAt;
    updatedAt;
    user;
    messages;
};
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionCreateInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserCreateNestedOneWithoutChatSessionsInput, { nullable: false })
], ChatSessionCreateInput.prototype, "user", void 0);
__decorate([
    Field(() => MessageCreateNestedManyWithoutChatSessionInput, { nullable: true })
], ChatSessionCreateInput.prototype, "messages", void 0);
ChatSessionCreateInput = __decorate([
    InputType()
], ChatSessionCreateInput);
export { ChatSessionCreateInput };
let ChatSessionGroupByArgs = class ChatSessionGroupByArgs {
    where;
    orderBy;
    by;
    having;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], ChatSessionGroupByArgs.prototype, "where", void 0);
__decorate([
    Field(() => [ChatSessionOrderByWithAggregationInput], { nullable: true })
], ChatSessionGroupByArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => [ChatSessionScalarFieldEnum], { nullable: false })
], ChatSessionGroupByArgs.prototype, "by", void 0);
__decorate([
    Field(() => ChatSessionScalarWhereWithAggregatesInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "having", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionGroupByArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionGroupByArgs.prototype, "skip", void 0);
__decorate([
    Field(() => ChatSessionCountAggregateInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "_count", void 0);
__decorate([
    Field(() => ChatSessionAvgAggregateInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => ChatSessionSumAggregateInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => ChatSessionMinAggregateInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "_min", void 0);
__decorate([
    Field(() => ChatSessionMaxAggregateInput, { nullable: true })
], ChatSessionGroupByArgs.prototype, "_max", void 0);
ChatSessionGroupByArgs = __decorate([
    ArgsType()
], ChatSessionGroupByArgs);
export { ChatSessionGroupByArgs };
let ChatSessionGroupBy = class ChatSessionGroupBy {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionGroupBy.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionGroupBy.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], ChatSessionGroupBy.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], ChatSessionGroupBy.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionGroupBy.prototype, "userId", void 0);
__decorate([
    Field(() => ChatSessionCountAggregate, { nullable: true })
], ChatSessionGroupBy.prototype, "_count", void 0);
__decorate([
    Field(() => ChatSessionAvgAggregate, { nullable: true })
], ChatSessionGroupBy.prototype, "_avg", void 0);
__decorate([
    Field(() => ChatSessionSumAggregate, { nullable: true })
], ChatSessionGroupBy.prototype, "_sum", void 0);
__decorate([
    Field(() => ChatSessionMinAggregate, { nullable: true })
], ChatSessionGroupBy.prototype, "_min", void 0);
__decorate([
    Field(() => ChatSessionMaxAggregate, { nullable: true })
], ChatSessionGroupBy.prototype, "_max", void 0);
ChatSessionGroupBy = __decorate([
    ObjectType()
], ChatSessionGroupBy);
export { ChatSessionGroupBy };
let ChatSessionListRelationFilter = class ChatSessionListRelationFilter {
    every;
    some;
    none;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true })
], ChatSessionListRelationFilter.prototype, "every", void 0);
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true })
], ChatSessionListRelationFilter.prototype, "some", void 0);
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true })
], ChatSessionListRelationFilter.prototype, "none", void 0);
ChatSessionListRelationFilter = __decorate([
    InputType()
], ChatSessionListRelationFilter);
export { ChatSessionListRelationFilter };
let ChatSessionMaxAggregateInput = class ChatSessionMaxAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMaxAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMaxAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMaxAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMaxAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMaxAggregateInput.prototype, "userId", void 0);
ChatSessionMaxAggregateInput = __decorate([
    InputType()
], ChatSessionMaxAggregateInput);
export { ChatSessionMaxAggregateInput };
let ChatSessionMaxAggregate = class ChatSessionMaxAggregate {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionMaxAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionMaxAggregate.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionMaxAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionMaxAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionMaxAggregate.prototype, "userId", void 0);
ChatSessionMaxAggregate = __decorate([
    ObjectType()
], ChatSessionMaxAggregate);
export { ChatSessionMaxAggregate };
let ChatSessionMaxOrderByAggregateInput = class ChatSessionMaxOrderByAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMaxOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMaxOrderByAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMaxOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMaxOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMaxOrderByAggregateInput.prototype, "userId", void 0);
ChatSessionMaxOrderByAggregateInput = __decorate([
    InputType()
], ChatSessionMaxOrderByAggregateInput);
export { ChatSessionMaxOrderByAggregateInput };
let ChatSessionMinAggregateInput = class ChatSessionMinAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMinAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMinAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMinAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMinAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionMinAggregateInput.prototype, "userId", void 0);
ChatSessionMinAggregateInput = __decorate([
    InputType()
], ChatSessionMinAggregateInput);
export { ChatSessionMinAggregateInput };
let ChatSessionMinAggregate = class ChatSessionMinAggregate {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionMinAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionMinAggregate.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionMinAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionMinAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionMinAggregate.prototype, "userId", void 0);
ChatSessionMinAggregate = __decorate([
    ObjectType()
], ChatSessionMinAggregate);
export { ChatSessionMinAggregate };
let ChatSessionMinOrderByAggregateInput = class ChatSessionMinOrderByAggregateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMinOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMinOrderByAggregateInput.prototype, "title", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMinOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMinOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionMinOrderByAggregateInput.prototype, "userId", void 0);
ChatSessionMinOrderByAggregateInput = __decorate([
    InputType()
], ChatSessionMinOrderByAggregateInput);
export { ChatSessionMinOrderByAggregateInput };
let ChatSessionOrderByRelationAggregateInput = class ChatSessionOrderByRelationAggregateInput {
    _count;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByRelationAggregateInput.prototype, "_count", void 0);
ChatSessionOrderByRelationAggregateInput = __decorate([
    InputType()
], ChatSessionOrderByRelationAggregateInput);
export { ChatSessionOrderByRelationAggregateInput };
let ChatSessionOrderByWithAggregationInput = class ChatSessionOrderByWithAggregationInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    _count;
    _avg;
    _max;
    _min;
    _sum;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "title", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "userId", void 0);
__decorate([
    Field(() => ChatSessionCountOrderByAggregateInput, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "_count", void 0);
__decorate([
    Field(() => ChatSessionAvgOrderByAggregateInput, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "_avg", void 0);
__decorate([
    Field(() => ChatSessionMaxOrderByAggregateInput, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "_max", void 0);
__decorate([
    Field(() => ChatSessionMinOrderByAggregateInput, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "_min", void 0);
__decorate([
    Field(() => ChatSessionSumOrderByAggregateInput, { nullable: true })
], ChatSessionOrderByWithAggregationInput.prototype, "_sum", void 0);
ChatSessionOrderByWithAggregationInput = __decorate([
    InputType()
], ChatSessionOrderByWithAggregationInput);
export { ChatSessionOrderByWithAggregationInput };
let ChatSessionOrderByWithRelationInput = class ChatSessionOrderByWithRelationInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    user;
    messages;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "title", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "userId", void 0);
__decorate([
    Field(() => UserOrderByWithRelationInput, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "user", void 0);
__decorate([
    Field(() => MessageOrderByRelationAggregateInput, { nullable: true })
], ChatSessionOrderByWithRelationInput.prototype, "messages", void 0);
ChatSessionOrderByWithRelationInput = __decorate([
    InputType()
], ChatSessionOrderByWithRelationInput);
export { ChatSessionOrderByWithRelationInput };
let ChatSessionScalarRelationFilter = class ChatSessionScalarRelationFilter {
    is;
    isNot;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true })
], ChatSessionScalarRelationFilter.prototype, "is", void 0);
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true })
], ChatSessionScalarRelationFilter.prototype, "isNot", void 0);
ChatSessionScalarRelationFilter = __decorate([
    InputType()
], ChatSessionScalarRelationFilter);
export { ChatSessionScalarRelationFilter };
let ChatSessionScalarWhereWithAggregatesInput = ChatSessionScalarWhereWithAggregatesInput_1 = class ChatSessionScalarWhereWithAggregatesInput {
    AND;
    OR;
    NOT;
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => [ChatSessionScalarWhereWithAggregatesInput_1], { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "AND", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereWithAggregatesInput_1], { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "OR", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereWithAggregatesInput_1], { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntWithAggregatesFilter, { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "id", void 0);
__decorate([
    Field(() => StringWithAggregatesFilter, { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "title", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntWithAggregatesFilter, { nullable: true })
], ChatSessionScalarWhereWithAggregatesInput.prototype, "userId", void 0);
ChatSessionScalarWhereWithAggregatesInput = ChatSessionScalarWhereWithAggregatesInput_1 = __decorate([
    InputType()
], ChatSessionScalarWhereWithAggregatesInput);
export { ChatSessionScalarWhereWithAggregatesInput };
let ChatSessionScalarWhereInput = ChatSessionScalarWhereInput_1 = class ChatSessionScalarWhereInput {
    AND;
    OR;
    NOT;
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => [ChatSessionScalarWhereInput_1], { nullable: true })
], ChatSessionScalarWhereInput.prototype, "AND", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereInput_1], { nullable: true })
], ChatSessionScalarWhereInput.prototype, "OR", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereInput_1], { nullable: true })
], ChatSessionScalarWhereInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], ChatSessionScalarWhereInput.prototype, "id", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], ChatSessionScalarWhereInput.prototype, "title", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionScalarWhereInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionScalarWhereInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], ChatSessionScalarWhereInput.prototype, "userId", void 0);
ChatSessionScalarWhereInput = ChatSessionScalarWhereInput_1 = __decorate([
    InputType()
], ChatSessionScalarWhereInput);
export { ChatSessionScalarWhereInput };
let ChatSessionSumAggregateInput = class ChatSessionSumAggregateInput {
    id;
    userId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionSumAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], ChatSessionSumAggregateInput.prototype, "userId", void 0);
ChatSessionSumAggregateInput = __decorate([
    InputType()
], ChatSessionSumAggregateInput);
export { ChatSessionSumAggregateInput };
let ChatSessionSumAggregate = class ChatSessionSumAggregate {
    id;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionSumAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionSumAggregate.prototype, "userId", void 0);
ChatSessionSumAggregate = __decorate([
    ObjectType()
], ChatSessionSumAggregate);
export { ChatSessionSumAggregate };
let ChatSessionSumOrderByAggregateInput = class ChatSessionSumOrderByAggregateInput {
    id;
    userId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionSumOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], ChatSessionSumOrderByAggregateInput.prototype, "userId", void 0);
ChatSessionSumOrderByAggregateInput = __decorate([
    InputType()
], ChatSessionSumOrderByAggregateInput);
export { ChatSessionSumOrderByAggregateInput };
let ChatSessionUncheckedCreateNestedManyWithoutUserInput = class ChatSessionUncheckedCreateNestedManyWithoutUserInput {
    create;
    connectOrCreate;
    createMany;
    connect;
};
__decorate([
    Field(() => [ChatSessionCreateWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionUncheckedCreateNestedManyWithoutUserInput.prototype, "create", void 0);
__decorate([
    Field(() => [ChatSessionCreateOrConnectWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutUserInput)
], ChatSessionUncheckedCreateNestedManyWithoutUserInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => ChatSessionCreateManyUserInputEnvelope, { nullable: true }),
    Type(() => ChatSessionCreateManyUserInputEnvelope)
], ChatSessionUncheckedCreateNestedManyWithoutUserInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUncheckedCreateNestedManyWithoutUserInput.prototype, "connect", void 0);
ChatSessionUncheckedCreateNestedManyWithoutUserInput = __decorate([
    InputType()
], ChatSessionUncheckedCreateNestedManyWithoutUserInput);
export { ChatSessionUncheckedCreateNestedManyWithoutUserInput };
let ChatSessionUncheckedCreateWithoutMessagesInput = class ChatSessionUncheckedCreateWithoutMessagesInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedCreateWithoutMessagesInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionUncheckedCreateWithoutMessagesInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateWithoutMessagesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateWithoutMessagesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionUncheckedCreateWithoutMessagesInput.prototype, "userId", void 0);
ChatSessionUncheckedCreateWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionUncheckedCreateWithoutMessagesInput);
export { ChatSessionUncheckedCreateWithoutMessagesInput };
let ChatSessionUncheckedCreateWithoutUserInput = class ChatSessionUncheckedCreateWithoutUserInput {
    id;
    title;
    createdAt;
    updatedAt;
    messages;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedCreateWithoutUserInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionUncheckedCreateWithoutUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateWithoutUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateWithoutUserInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => MessageUncheckedCreateNestedManyWithoutChatSessionInput, { nullable: true })
], ChatSessionUncheckedCreateWithoutUserInput.prototype, "messages", void 0);
ChatSessionUncheckedCreateWithoutUserInput = __decorate([
    InputType()
], ChatSessionUncheckedCreateWithoutUserInput);
export { ChatSessionUncheckedCreateWithoutUserInput };
let ChatSessionUncheckedCreateInput = class ChatSessionUncheckedCreateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    messages;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedCreateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSessionUncheckedCreateInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSessionUncheckedCreateInput.prototype, "userId", void 0);
__decorate([
    Field(() => MessageUncheckedCreateNestedManyWithoutChatSessionInput, { nullable: true })
], ChatSessionUncheckedCreateInput.prototype, "messages", void 0);
ChatSessionUncheckedCreateInput = __decorate([
    InputType()
], ChatSessionUncheckedCreateInput);
export { ChatSessionUncheckedCreateInput };
let ChatSessionUncheckedUpdateManyWithoutUserNestedInput = class ChatSessionUncheckedUpdateManyWithoutUserNestedInput {
    create;
    connectOrCreate;
    upsert;
    createMany;
    set;
    disconnect;
    delete;
    connect;
    update;
    updateMany;
    deleteMany;
};
__decorate([
    Field(() => [ChatSessionCreateWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => [ChatSessionCreateOrConnectWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutUserInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => [ChatSessionUpsertWithWhereUniqueWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpsertWithWhereUniqueWithoutUserInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => ChatSessionCreateManyUserInputEnvelope, { nullable: true }),
    Type(() => ChatSessionCreateManyUserInputEnvelope)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "set", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "disconnect", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "delete", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => [ChatSessionUpdateWithWhereUniqueWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpdateWithWhereUniqueWithoutUserInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "update", void 0);
__decorate([
    Field(() => [ChatSessionUpdateManyWithWhereWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpdateManyWithWhereWithoutUserInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "updateMany", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereInput], { nullable: true }),
    Type(() => ChatSessionScalarWhereInput)
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput.prototype, "deleteMany", void 0);
ChatSessionUncheckedUpdateManyWithoutUserNestedInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateManyWithoutUserNestedInput);
export { ChatSessionUncheckedUpdateManyWithoutUserNestedInput };
let ChatSessionUncheckedUpdateManyWithoutUserInput = class ChatSessionUncheckedUpdateManyWithoutUserInput {
    id;
    title;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateManyWithoutUserInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUncheckedUpdateManyWithoutUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateManyWithoutUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateManyWithoutUserInput.prototype, "updatedAt", void 0);
ChatSessionUncheckedUpdateManyWithoutUserInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateManyWithoutUserInput);
export { ChatSessionUncheckedUpdateManyWithoutUserInput };
let ChatSessionUncheckedUpdateManyInput = class ChatSessionUncheckedUpdateManyInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUncheckedUpdateManyInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateManyInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateManyInput.prototype, "userId", void 0);
ChatSessionUncheckedUpdateManyInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateManyInput);
export { ChatSessionUncheckedUpdateManyInput };
let ChatSessionUncheckedUpdateWithoutMessagesInput = class ChatSessionUncheckedUpdateWithoutMessagesInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateWithoutMessagesInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUncheckedUpdateWithoutMessagesInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateWithoutMessagesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateWithoutMessagesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateWithoutMessagesInput.prototype, "userId", void 0);
ChatSessionUncheckedUpdateWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateWithoutMessagesInput);
export { ChatSessionUncheckedUpdateWithoutMessagesInput };
let ChatSessionUncheckedUpdateWithoutUserInput = class ChatSessionUncheckedUpdateWithoutUserInput {
    id;
    title;
    createdAt;
    updatedAt;
    messages;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateWithoutUserInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUncheckedUpdateWithoutUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateWithoutUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateWithoutUserInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => MessageUncheckedUpdateManyWithoutChatSessionNestedInput, { nullable: true })
], ChatSessionUncheckedUpdateWithoutUserInput.prototype, "messages", void 0);
ChatSessionUncheckedUpdateWithoutUserInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateWithoutUserInput);
export { ChatSessionUncheckedUpdateWithoutUserInput };
let ChatSessionUncheckedUpdateInput = class ChatSessionUncheckedUpdateInput {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    messages;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "userId", void 0);
__decorate([
    Field(() => MessageUncheckedUpdateManyWithoutChatSessionNestedInput, { nullable: true })
], ChatSessionUncheckedUpdateInput.prototype, "messages", void 0);
ChatSessionUncheckedUpdateInput = __decorate([
    InputType()
], ChatSessionUncheckedUpdateInput);
export { ChatSessionUncheckedUpdateInput };
let ChatSessionUpdateManyMutationInput = class ChatSessionUpdateManyMutationInput {
    title;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUpdateManyMutationInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateManyMutationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateManyMutationInput.prototype, "updatedAt", void 0);
ChatSessionUpdateManyMutationInput = __decorate([
    InputType()
], ChatSessionUpdateManyMutationInput);
export { ChatSessionUpdateManyMutationInput };
let ChatSessionUpdateManyWithWhereWithoutUserInput = class ChatSessionUpdateManyWithWhereWithoutUserInput {
    where;
    data;
};
__decorate([
    Field(() => ChatSessionScalarWhereInput, { nullable: false }),
    Type(() => ChatSessionScalarWhereInput)
], ChatSessionUpdateManyWithWhereWithoutUserInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionUpdateManyMutationInput, { nullable: false }),
    Type(() => ChatSessionUpdateManyMutationInput)
], ChatSessionUpdateManyWithWhereWithoutUserInput.prototype, "data", void 0);
ChatSessionUpdateManyWithWhereWithoutUserInput = __decorate([
    InputType()
], ChatSessionUpdateManyWithWhereWithoutUserInput);
export { ChatSessionUpdateManyWithWhereWithoutUserInput };
let ChatSessionUpdateManyWithoutUserNestedInput = class ChatSessionUpdateManyWithoutUserNestedInput {
    create;
    connectOrCreate;
    upsert;
    createMany;
    set;
    disconnect;
    delete;
    connect;
    update;
    updateMany;
    deleteMany;
};
__decorate([
    Field(() => [ChatSessionCreateWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => [ChatSessionCreateOrConnectWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutUserInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => [ChatSessionUpsertWithWhereUniqueWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpsertWithWhereUniqueWithoutUserInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => ChatSessionCreateManyUserInputEnvelope, { nullable: true }),
    Type(() => ChatSessionCreateManyUserInputEnvelope)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "set", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "disconnect", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "delete", void 0);
__decorate([
    Field(() => [ChatSessionWhereUniqueInput], { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => [ChatSessionUpdateWithWhereUniqueWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpdateWithWhereUniqueWithoutUserInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "update", void 0);
__decorate([
    Field(() => [ChatSessionUpdateManyWithWhereWithoutUserInput], { nullable: true }),
    Type(() => ChatSessionUpdateManyWithWhereWithoutUserInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "updateMany", void 0);
__decorate([
    Field(() => [ChatSessionScalarWhereInput], { nullable: true }),
    Type(() => ChatSessionScalarWhereInput)
], ChatSessionUpdateManyWithoutUserNestedInput.prototype, "deleteMany", void 0);
ChatSessionUpdateManyWithoutUserNestedInput = __decorate([
    InputType()
], ChatSessionUpdateManyWithoutUserNestedInput);
export { ChatSessionUpdateManyWithoutUserNestedInput };
let ChatSessionUpdateOneRequiredWithoutMessagesNestedInput = class ChatSessionUpdateOneRequiredWithoutMessagesNestedInput {
    create;
    connectOrCreate;
    upsert;
    connect;
    update;
};
__decorate([
    Field(() => ChatSessionCreateWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionCreateWithoutMessagesInput)
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => ChatSessionCreateOrConnectWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionCreateOrConnectWithoutMessagesInput)
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => ChatSessionUpsertWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionUpsertWithoutMessagesInput)
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => ChatSessionUpdateToOneWithWhereWithoutMessagesInput, { nullable: true }),
    Type(() => ChatSessionUpdateToOneWithWhereWithoutMessagesInput)
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.prototype, "update", void 0);
ChatSessionUpdateOneRequiredWithoutMessagesNestedInput = __decorate([
    InputType()
], ChatSessionUpdateOneRequiredWithoutMessagesNestedInput);
export { ChatSessionUpdateOneRequiredWithoutMessagesNestedInput };
let ChatSessionUpdateToOneWithWhereWithoutMessagesInput = class ChatSessionUpdateToOneWithWhereWithoutMessagesInput {
    where;
    data;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], ChatSessionUpdateToOneWithWhereWithoutMessagesInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionUpdateWithoutMessagesInput, { nullable: false }),
    Type(() => ChatSessionUpdateWithoutMessagesInput)
], ChatSessionUpdateToOneWithWhereWithoutMessagesInput.prototype, "data", void 0);
ChatSessionUpdateToOneWithWhereWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionUpdateToOneWithWhereWithoutMessagesInput);
export { ChatSessionUpdateToOneWithWhereWithoutMessagesInput };
let ChatSessionUpdateWithWhereUniqueWithoutUserInput = class ChatSessionUpdateWithWhereUniqueWithoutUserInput {
    where;
    data;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpdateWithWhereUniqueWithoutUserInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionUpdateWithoutUserInput, { nullable: false }),
    Type(() => ChatSessionUpdateWithoutUserInput)
], ChatSessionUpdateWithWhereUniqueWithoutUserInput.prototype, "data", void 0);
ChatSessionUpdateWithWhereUniqueWithoutUserInput = __decorate([
    InputType()
], ChatSessionUpdateWithWhereUniqueWithoutUserInput);
export { ChatSessionUpdateWithWhereUniqueWithoutUserInput };
let ChatSessionUpdateWithoutMessagesInput = class ChatSessionUpdateWithoutMessagesInput {
    title;
    createdAt;
    updatedAt;
    user;
};
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUpdateWithoutMessagesInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateWithoutMessagesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateWithoutMessagesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserUpdateOneRequiredWithoutChatSessionsNestedInput, { nullable: true })
], ChatSessionUpdateWithoutMessagesInput.prototype, "user", void 0);
ChatSessionUpdateWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionUpdateWithoutMessagesInput);
export { ChatSessionUpdateWithoutMessagesInput };
let ChatSessionUpdateWithoutUserInput = class ChatSessionUpdateWithoutUserInput {
    title;
    createdAt;
    updatedAt;
    messages;
};
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUpdateWithoutUserInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateWithoutUserInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateWithoutUserInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => MessageUpdateManyWithoutChatSessionNestedInput, { nullable: true })
], ChatSessionUpdateWithoutUserInput.prototype, "messages", void 0);
ChatSessionUpdateWithoutUserInput = __decorate([
    InputType()
], ChatSessionUpdateWithoutUserInput);
export { ChatSessionUpdateWithoutUserInput };
let ChatSessionUpdateInput = class ChatSessionUpdateInput {
    title;
    createdAt;
    updatedAt;
    user;
    messages;
};
__decorate([
    Field(() => String, { nullable: true })
], ChatSessionUpdateInput.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], ChatSessionUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserUpdateOneRequiredWithoutChatSessionsNestedInput, { nullable: true })
], ChatSessionUpdateInput.prototype, "user", void 0);
__decorate([
    Field(() => MessageUpdateManyWithoutChatSessionNestedInput, { nullable: true })
], ChatSessionUpdateInput.prototype, "messages", void 0);
ChatSessionUpdateInput = __decorate([
    InputType()
], ChatSessionUpdateInput);
export { ChatSessionUpdateInput };
let ChatSessionUpsertWithWhereUniqueWithoutUserInput = class ChatSessionUpsertWithWhereUniqueWithoutUserInput {
    where;
    update;
    create;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], ChatSessionUpsertWithWhereUniqueWithoutUserInput.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionUpdateWithoutUserInput, { nullable: false }),
    Type(() => ChatSessionUpdateWithoutUserInput)
], ChatSessionUpsertWithWhereUniqueWithoutUserInput.prototype, "update", void 0);
__decorate([
    Field(() => ChatSessionCreateWithoutUserInput, { nullable: false }),
    Type(() => ChatSessionCreateWithoutUserInput)
], ChatSessionUpsertWithWhereUniqueWithoutUserInput.prototype, "create", void 0);
ChatSessionUpsertWithWhereUniqueWithoutUserInput = __decorate([
    InputType()
], ChatSessionUpsertWithWhereUniqueWithoutUserInput);
export { ChatSessionUpsertWithWhereUniqueWithoutUserInput };
let ChatSessionUpsertWithoutMessagesInput = class ChatSessionUpsertWithoutMessagesInput {
    update;
    create;
    where;
};
__decorate([
    Field(() => ChatSessionUpdateWithoutMessagesInput, { nullable: false }),
    Type(() => ChatSessionUpdateWithoutMessagesInput)
], ChatSessionUpsertWithoutMessagesInput.prototype, "update", void 0);
__decorate([
    Field(() => ChatSessionCreateWithoutMessagesInput, { nullable: false }),
    Type(() => ChatSessionCreateWithoutMessagesInput)
], ChatSessionUpsertWithoutMessagesInput.prototype, "create", void 0);
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], ChatSessionUpsertWithoutMessagesInput.prototype, "where", void 0);
ChatSessionUpsertWithoutMessagesInput = __decorate([
    InputType()
], ChatSessionUpsertWithoutMessagesInput);
export { ChatSessionUpsertWithoutMessagesInput };
let ChatSessionWhereUniqueInput = class ChatSessionWhereUniqueInput {
    id;
    AND;
    OR;
    NOT;
    title;
    createdAt;
    updatedAt;
    userId;
    user;
    messages;
};
__decorate([
    Field(() => Int, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "id", void 0);
__decorate([
    Field(() => [ChatSessionWhereInput], { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "AND", void 0);
__decorate([
    Field(() => [ChatSessionWhereInput], { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "OR", void 0);
__decorate([
    Field(() => [ChatSessionWhereInput], { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "NOT", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "title", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "userId", void 0);
__decorate([
    Field(() => UserScalarRelationFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "user", void 0);
__decorate([
    Field(() => MessageListRelationFilter, { nullable: true })
], ChatSessionWhereUniqueInput.prototype, "messages", void 0);
ChatSessionWhereUniqueInput = __decorate([
    InputType()
], ChatSessionWhereUniqueInput);
export { ChatSessionWhereUniqueInput };
let ChatSessionWhereInput = ChatSessionWhereInput_1 = class ChatSessionWhereInput {
    AND;
    OR;
    NOT;
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    user;
    messages;
};
__decorate([
    Field(() => [ChatSessionWhereInput_1], { nullable: true })
], ChatSessionWhereInput.prototype, "AND", void 0);
__decorate([
    Field(() => [ChatSessionWhereInput_1], { nullable: true })
], ChatSessionWhereInput.prototype, "OR", void 0);
__decorate([
    Field(() => [ChatSessionWhereInput_1], { nullable: true })
], ChatSessionWhereInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "id", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "title", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "userId", void 0);
__decorate([
    Field(() => UserScalarRelationFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "user", void 0);
__decorate([
    Field(() => MessageListRelationFilter, { nullable: true })
], ChatSessionWhereInput.prototype, "messages", void 0);
ChatSessionWhereInput = ChatSessionWhereInput_1 = __decorate([
    InputType()
], ChatSessionWhereInput);
export { ChatSessionWhereInput };
let ChatSession = class ChatSession {
    id;
    title;
    createdAt;
    updatedAt;
    userId;
    user;
    messages;
    _count;
};
__decorate([
    Field(() => ID, { nullable: false })
], ChatSession.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], ChatSession.prototype, "title", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], ChatSession.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], ChatSession.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], ChatSession.prototype, "userId", void 0);
__decorate([
    Field(() => User, { nullable: false })
], ChatSession.prototype, "user", void 0);
__decorate([
    Field(() => [Message], { nullable: true })
], ChatSession.prototype, "messages", void 0);
__decorate([
    Field(() => ChatSessionCount, { nullable: false })
], ChatSession.prototype, "_count", void 0);
ChatSession = __decorate([
    ObjectType()
], ChatSession);
export { ChatSession };
let CreateManyChatSessionArgs = class CreateManyChatSessionArgs {
    data;
    skipDuplicates;
};
__decorate([
    Field(() => [ChatSessionCreateManyInput], { nullable: false }),
    Type(() => ChatSessionCreateManyInput)
], CreateManyChatSessionArgs.prototype, "data", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], CreateManyChatSessionArgs.prototype, "skipDuplicates", void 0);
CreateManyChatSessionArgs = __decorate([
    ArgsType()
], CreateManyChatSessionArgs);
export { CreateManyChatSessionArgs };
let CreateOneChatSessionArgs = class CreateOneChatSessionArgs {
    data;
};
__decorate([
    Field(() => ChatSessionCreateInput, { nullable: false }),
    Type(() => ChatSessionCreateInput)
], CreateOneChatSessionArgs.prototype, "data", void 0);
CreateOneChatSessionArgs = __decorate([
    ArgsType()
], CreateOneChatSessionArgs);
export { CreateOneChatSessionArgs };
let DeleteManyChatSessionArgs = class DeleteManyChatSessionArgs {
    where;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], DeleteManyChatSessionArgs.prototype, "where", void 0);
DeleteManyChatSessionArgs = __decorate([
    ArgsType()
], DeleteManyChatSessionArgs);
export { DeleteManyChatSessionArgs };
let DeleteOneChatSessionArgs = class DeleteOneChatSessionArgs {
    where;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], DeleteOneChatSessionArgs.prototype, "where", void 0);
DeleteOneChatSessionArgs = __decorate([
    ArgsType()
], DeleteOneChatSessionArgs);
export { DeleteOneChatSessionArgs };
let FindFirstChatSessionOrThrowArgs = class FindFirstChatSessionOrThrowArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], FindFirstChatSessionOrThrowArgs.prototype, "where", void 0);
__decorate([
    Field(() => [ChatSessionOrderByWithRelationInput], { nullable: true })
], FindFirstChatSessionOrThrowArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true })
], FindFirstChatSessionOrThrowArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstChatSessionOrThrowArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstChatSessionOrThrowArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [ChatSessionScalarFieldEnum], { nullable: true })
], FindFirstChatSessionOrThrowArgs.prototype, "distinct", void 0);
FindFirstChatSessionOrThrowArgs = __decorate([
    ArgsType()
], FindFirstChatSessionOrThrowArgs);
export { FindFirstChatSessionOrThrowArgs };
let FindFirstChatSessionArgs = class FindFirstChatSessionArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], FindFirstChatSessionArgs.prototype, "where", void 0);
__decorate([
    Field(() => [ChatSessionOrderByWithRelationInput], { nullable: true })
], FindFirstChatSessionArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true })
], FindFirstChatSessionArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstChatSessionArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstChatSessionArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [ChatSessionScalarFieldEnum], { nullable: true })
], FindFirstChatSessionArgs.prototype, "distinct", void 0);
FindFirstChatSessionArgs = __decorate([
    ArgsType()
], FindFirstChatSessionArgs);
export { FindFirstChatSessionArgs };
let FindManyChatSessionArgs = class FindManyChatSessionArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], FindManyChatSessionArgs.prototype, "where", void 0);
__decorate([
    Field(() => [ChatSessionOrderByWithRelationInput], { nullable: true })
], FindManyChatSessionArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: true })
], FindManyChatSessionArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyChatSessionArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyChatSessionArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [ChatSessionScalarFieldEnum], { nullable: true })
], FindManyChatSessionArgs.prototype, "distinct", void 0);
FindManyChatSessionArgs = __decorate([
    ArgsType()
], FindManyChatSessionArgs);
export { FindManyChatSessionArgs };
let FindUniqueChatSessionOrThrowArgs = class FindUniqueChatSessionOrThrowArgs {
    where;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], FindUniqueChatSessionOrThrowArgs.prototype, "where", void 0);
FindUniqueChatSessionOrThrowArgs = __decorate([
    ArgsType()
], FindUniqueChatSessionOrThrowArgs);
export { FindUniqueChatSessionOrThrowArgs };
let FindUniqueChatSessionArgs = class FindUniqueChatSessionArgs {
    where;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], FindUniqueChatSessionArgs.prototype, "where", void 0);
FindUniqueChatSessionArgs = __decorate([
    ArgsType()
], FindUniqueChatSessionArgs);
export { FindUniqueChatSessionArgs };
let UpdateManyChatSessionArgs = class UpdateManyChatSessionArgs {
    data;
    where;
};
__decorate([
    Field(() => ChatSessionUpdateManyMutationInput, { nullable: false }),
    Type(() => ChatSessionUpdateManyMutationInput)
], UpdateManyChatSessionArgs.prototype, "data", void 0);
__decorate([
    Field(() => ChatSessionWhereInput, { nullable: true }),
    Type(() => ChatSessionWhereInput)
], UpdateManyChatSessionArgs.prototype, "where", void 0);
UpdateManyChatSessionArgs = __decorate([
    ArgsType()
], UpdateManyChatSessionArgs);
export { UpdateManyChatSessionArgs };
let UpdateOneChatSessionArgs = class UpdateOneChatSessionArgs {
    data;
    where;
};
__decorate([
    Field(() => ChatSessionUpdateInput, { nullable: false }),
    Type(() => ChatSessionUpdateInput)
], UpdateOneChatSessionArgs.prototype, "data", void 0);
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], UpdateOneChatSessionArgs.prototype, "where", void 0);
UpdateOneChatSessionArgs = __decorate([
    ArgsType()
], UpdateOneChatSessionArgs);
export { UpdateOneChatSessionArgs };
let UpsertOneChatSessionArgs = class UpsertOneChatSessionArgs {
    where;
    create;
    update;
};
__decorate([
    Field(() => ChatSessionWhereUniqueInput, { nullable: false }),
    Type(() => ChatSessionWhereUniqueInput)
], UpsertOneChatSessionArgs.prototype, "where", void 0);
__decorate([
    Field(() => ChatSessionCreateInput, { nullable: false }),
    Type(() => ChatSessionCreateInput)
], UpsertOneChatSessionArgs.prototype, "create", void 0);
__decorate([
    Field(() => ChatSessionUpdateInput, { nullable: false }),
    Type(() => ChatSessionUpdateInput)
], UpsertOneChatSessionArgs.prototype, "update", void 0);
UpsertOneChatSessionArgs = __decorate([
    ArgsType()
], UpsertOneChatSessionArgs);
export { UpsertOneChatSessionArgs };
let AggregateMessage = class AggregateMessage {
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => MessageCountAggregate, { nullable: true })
], AggregateMessage.prototype, "_count", void 0);
__decorate([
    Field(() => MessageAvgAggregate, { nullable: true })
], AggregateMessage.prototype, "_avg", void 0);
__decorate([
    Field(() => MessageSumAggregate, { nullable: true })
], AggregateMessage.prototype, "_sum", void 0);
__decorate([
    Field(() => MessageMinAggregate, { nullable: true })
], AggregateMessage.prototype, "_min", void 0);
__decorate([
    Field(() => MessageMaxAggregate, { nullable: true })
], AggregateMessage.prototype, "_max", void 0);
AggregateMessage = __decorate([
    ObjectType()
], AggregateMessage);
export { AggregateMessage };
let CreateManyMessageArgs = class CreateManyMessageArgs {
    data;
    skipDuplicates;
};
__decorate([
    Field(() => [MessageCreateManyInput], { nullable: false }),
    Type(() => MessageCreateManyInput)
], CreateManyMessageArgs.prototype, "data", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], CreateManyMessageArgs.prototype, "skipDuplicates", void 0);
CreateManyMessageArgs = __decorate([
    ArgsType()
], CreateManyMessageArgs);
export { CreateManyMessageArgs };
let CreateOneMessageArgs = class CreateOneMessageArgs {
    data;
};
__decorate([
    Field(() => MessageCreateInput, { nullable: false }),
    Type(() => MessageCreateInput)
], CreateOneMessageArgs.prototype, "data", void 0);
CreateOneMessageArgs = __decorate([
    ArgsType()
], CreateOneMessageArgs);
export { CreateOneMessageArgs };
let DeleteManyMessageArgs = class DeleteManyMessageArgs {
    where;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], DeleteManyMessageArgs.prototype, "where", void 0);
DeleteManyMessageArgs = __decorate([
    ArgsType()
], DeleteManyMessageArgs);
export { DeleteManyMessageArgs };
let DeleteOneMessageArgs = class DeleteOneMessageArgs {
    where;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], DeleteOneMessageArgs.prototype, "where", void 0);
DeleteOneMessageArgs = __decorate([
    ArgsType()
], DeleteOneMessageArgs);
export { DeleteOneMessageArgs };
let FindFirstMessageOrThrowArgs = class FindFirstMessageOrThrowArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], FindFirstMessageOrThrowArgs.prototype, "where", void 0);
__decorate([
    Field(() => [MessageOrderByWithRelationInput], { nullable: true })
], FindFirstMessageOrThrowArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: true })
], FindFirstMessageOrThrowArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstMessageOrThrowArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstMessageOrThrowArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [MessageScalarFieldEnum], { nullable: true })
], FindFirstMessageOrThrowArgs.prototype, "distinct", void 0);
FindFirstMessageOrThrowArgs = __decorate([
    ArgsType()
], FindFirstMessageOrThrowArgs);
export { FindFirstMessageOrThrowArgs };
let FindFirstMessageArgs = class FindFirstMessageArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], FindFirstMessageArgs.prototype, "where", void 0);
__decorate([
    Field(() => [MessageOrderByWithRelationInput], { nullable: true })
], FindFirstMessageArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: true })
], FindFirstMessageArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstMessageArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstMessageArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [MessageScalarFieldEnum], { nullable: true })
], FindFirstMessageArgs.prototype, "distinct", void 0);
FindFirstMessageArgs = __decorate([
    ArgsType()
], FindFirstMessageArgs);
export { FindFirstMessageArgs };
let FindManyMessageArgs = class FindManyMessageArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], FindManyMessageArgs.prototype, "where", void 0);
__decorate([
    Field(() => [MessageOrderByWithRelationInput], { nullable: true })
], FindManyMessageArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: true })
], FindManyMessageArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyMessageArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyMessageArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [MessageScalarFieldEnum], { nullable: true })
], FindManyMessageArgs.prototype, "distinct", void 0);
FindManyMessageArgs = __decorate([
    ArgsType()
], FindManyMessageArgs);
export { FindManyMessageArgs };
let FindUniqueMessageOrThrowArgs = class FindUniqueMessageOrThrowArgs {
    where;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], FindUniqueMessageOrThrowArgs.prototype, "where", void 0);
FindUniqueMessageOrThrowArgs = __decorate([
    ArgsType()
], FindUniqueMessageOrThrowArgs);
export { FindUniqueMessageOrThrowArgs };
let FindUniqueMessageArgs = class FindUniqueMessageArgs {
    where;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], FindUniqueMessageArgs.prototype, "where", void 0);
FindUniqueMessageArgs = __decorate([
    ArgsType()
], FindUniqueMessageArgs);
export { FindUniqueMessageArgs };
let MessageAggregateArgs = class MessageAggregateArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], MessageAggregateArgs.prototype, "where", void 0);
__decorate([
    Field(() => [MessageOrderByWithRelationInput], { nullable: true })
], MessageAggregateArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: true })
], MessageAggregateArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageAggregateArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageAggregateArgs.prototype, "skip", void 0);
__decorate([
    Field(() => MessageCountAggregateInput, { nullable: true })
], MessageAggregateArgs.prototype, "_count", void 0);
__decorate([
    Field(() => MessageAvgAggregateInput, { nullable: true })
], MessageAggregateArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => MessageSumAggregateInput, { nullable: true })
], MessageAggregateArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => MessageMinAggregateInput, { nullable: true })
], MessageAggregateArgs.prototype, "_min", void 0);
__decorate([
    Field(() => MessageMaxAggregateInput, { nullable: true })
], MessageAggregateArgs.prototype, "_max", void 0);
MessageAggregateArgs = __decorate([
    ArgsType()
], MessageAggregateArgs);
export { MessageAggregateArgs };
let MessageAvgAggregateInput = class MessageAvgAggregateInput {
    id;
    chatSessionId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageAvgAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageAvgAggregateInput.prototype, "chatSessionId", void 0);
MessageAvgAggregateInput = __decorate([
    InputType()
], MessageAvgAggregateInput);
export { MessageAvgAggregateInput };
let MessageAvgAggregate = class MessageAvgAggregate {
    id;
    chatSessionId;
};
__decorate([
    Field(() => Float, { nullable: true })
], MessageAvgAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], MessageAvgAggregate.prototype, "chatSessionId", void 0);
MessageAvgAggregate = __decorate([
    ObjectType()
], MessageAvgAggregate);
export { MessageAvgAggregate };
let MessageAvgOrderByAggregateInput = class MessageAvgOrderByAggregateInput {
    id;
    chatSessionId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageAvgOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageAvgOrderByAggregateInput.prototype, "chatSessionId", void 0);
MessageAvgOrderByAggregateInput = __decorate([
    InputType()
], MessageAvgOrderByAggregateInput);
export { MessageAvgOrderByAggregateInput };
let MessageCountAggregateInput = class MessageCountAggregateInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    _all;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "payload", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCountAggregateInput.prototype, "_all", void 0);
MessageCountAggregateInput = __decorate([
    InputType()
], MessageCountAggregateInput);
export { MessageCountAggregateInput };
let MessageCountAggregate = class MessageCountAggregate {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    _all;
};
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "sender", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "type", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "content", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "payload", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "timestamp", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCountAggregate.prototype, "_all", void 0);
MessageCountAggregate = __decorate([
    ObjectType()
], MessageCountAggregate);
export { MessageCountAggregate };
let MessageCountOrderByAggregateInput = class MessageCountOrderByAggregateInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "payload", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageCountOrderByAggregateInput.prototype, "chatSessionId", void 0);
MessageCountOrderByAggregateInput = __decorate([
    InputType()
], MessageCountOrderByAggregateInput);
export { MessageCountOrderByAggregateInput };
let MessageCreateManyChatSessionInputEnvelope = class MessageCreateManyChatSessionInputEnvelope {
    data;
    skipDuplicates;
};
__decorate([
    Field(() => [MessageCreateManyChatSessionInput], { nullable: false }),
    Type(() => MessageCreateManyChatSessionInput)
], MessageCreateManyChatSessionInputEnvelope.prototype, "data", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageCreateManyChatSessionInputEnvelope.prototype, "skipDuplicates", void 0);
MessageCreateManyChatSessionInputEnvelope = __decorate([
    InputType()
], MessageCreateManyChatSessionInputEnvelope);
export { MessageCreateManyChatSessionInputEnvelope };
let MessageCreateManyChatSessionInput = class MessageCreateManyChatSessionInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageCreateManyChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyChatSessionInput.prototype, "updatedAt", void 0);
MessageCreateManyChatSessionInput = __decorate([
    InputType()
], MessageCreateManyChatSessionInput);
export { MessageCreateManyChatSessionInput };
let MessageCreateManyInput = class MessageCreateManyInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageCreateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageCreateManyInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateManyInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateManyInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageCreateManyInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateManyInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageCreateManyInput.prototype, "chatSessionId", void 0);
MessageCreateManyInput = __decorate([
    InputType()
], MessageCreateManyInput);
export { MessageCreateManyInput };
let MessageCreateNestedManyWithoutChatSessionInput = class MessageCreateNestedManyWithoutChatSessionInput {
    create;
    connectOrCreate;
    createMany;
    connect;
};
__decorate([
    Field(() => [MessageCreateWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageCreateNestedManyWithoutChatSessionInput.prototype, "create", void 0);
__decorate([
    Field(() => [MessageCreateOrConnectWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateOrConnectWithoutChatSessionInput)
], MessageCreateNestedManyWithoutChatSessionInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => MessageCreateManyChatSessionInputEnvelope, { nullable: true }),
    Type(() => MessageCreateManyChatSessionInputEnvelope)
], MessageCreateNestedManyWithoutChatSessionInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageCreateNestedManyWithoutChatSessionInput.prototype, "connect", void 0);
MessageCreateNestedManyWithoutChatSessionInput = __decorate([
    InputType()
], MessageCreateNestedManyWithoutChatSessionInput);
export { MessageCreateNestedManyWithoutChatSessionInput };
let MessageCreateOrConnectWithoutChatSessionInput = class MessageCreateOrConnectWithoutChatSessionInput {
    where;
    create;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], MessageCreateOrConnectWithoutChatSessionInput.prototype, "where", void 0);
__decorate([
    Field(() => MessageCreateWithoutChatSessionInput, { nullable: false }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageCreateOrConnectWithoutChatSessionInput.prototype, "create", void 0);
MessageCreateOrConnectWithoutChatSessionInput = __decorate([
    InputType()
], MessageCreateOrConnectWithoutChatSessionInput);
export { MessageCreateOrConnectWithoutChatSessionInput };
let MessageCreateWithoutChatSessionInput = class MessageCreateWithoutChatSessionInput {
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: false })
], MessageCreateWithoutChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateWithoutChatSessionInput.prototype, "updatedAt", void 0);
MessageCreateWithoutChatSessionInput = __decorate([
    InputType()
], MessageCreateWithoutChatSessionInput);
export { MessageCreateWithoutChatSessionInput };
let MessageCreateInput = class MessageCreateInput {
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSession;
};
__decorate([
    Field(() => String, { nullable: false })
], MessageCreateInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageCreateInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageCreateInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionCreateNestedOneWithoutMessagesInput, { nullable: false })
], MessageCreateInput.prototype, "chatSession", void 0);
MessageCreateInput = __decorate([
    InputType()
], MessageCreateInput);
export { MessageCreateInput };
let MessageGroupByArgs = class MessageGroupByArgs {
    where;
    orderBy;
    by;
    having;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], MessageGroupByArgs.prototype, "where", void 0);
__decorate([
    Field(() => [MessageOrderByWithAggregationInput], { nullable: true })
], MessageGroupByArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => [MessageScalarFieldEnum], { nullable: false })
], MessageGroupByArgs.prototype, "by", void 0);
__decorate([
    Field(() => MessageScalarWhereWithAggregatesInput, { nullable: true })
], MessageGroupByArgs.prototype, "having", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageGroupByArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageGroupByArgs.prototype, "skip", void 0);
__decorate([
    Field(() => MessageCountAggregateInput, { nullable: true })
], MessageGroupByArgs.prototype, "_count", void 0);
__decorate([
    Field(() => MessageAvgAggregateInput, { nullable: true })
], MessageGroupByArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => MessageSumAggregateInput, { nullable: true })
], MessageGroupByArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => MessageMinAggregateInput, { nullable: true })
], MessageGroupByArgs.prototype, "_min", void 0);
__decorate([
    Field(() => MessageMaxAggregateInput, { nullable: true })
], MessageGroupByArgs.prototype, "_max", void 0);
MessageGroupByArgs = __decorate([
    ArgsType()
], MessageGroupByArgs);
export { MessageGroupByArgs };
let MessageGroupBy = class MessageGroupBy {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => Int, { nullable: false })
], MessageGroupBy.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageGroupBy.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageGroupBy.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageGroupBy.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageGroupBy.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], MessageGroupBy.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], MessageGroupBy.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], MessageGroupBy.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageGroupBy.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => MessageCountAggregate, { nullable: true })
], MessageGroupBy.prototype, "_count", void 0);
__decorate([
    Field(() => MessageAvgAggregate, { nullable: true })
], MessageGroupBy.prototype, "_avg", void 0);
__decorate([
    Field(() => MessageSumAggregate, { nullable: true })
], MessageGroupBy.prototype, "_sum", void 0);
__decorate([
    Field(() => MessageMinAggregate, { nullable: true })
], MessageGroupBy.prototype, "_min", void 0);
__decorate([
    Field(() => MessageMaxAggregate, { nullable: true })
], MessageGroupBy.prototype, "_max", void 0);
MessageGroupBy = __decorate([
    ObjectType()
], MessageGroupBy);
export { MessageGroupBy };
let MessageListRelationFilter = class MessageListRelationFilter {
    every;
    some;
    none;
};
__decorate([
    Field(() => MessageWhereInput, { nullable: true })
], MessageListRelationFilter.prototype, "every", void 0);
__decorate([
    Field(() => MessageWhereInput, { nullable: true })
], MessageListRelationFilter.prototype, "some", void 0);
__decorate([
    Field(() => MessageWhereInput, { nullable: true })
], MessageListRelationFilter.prototype, "none", void 0);
MessageListRelationFilter = __decorate([
    InputType()
], MessageListRelationFilter);
export { MessageListRelationFilter };
let MessageMaxAggregateInput = class MessageMaxAggregateInput {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMaxAggregateInput.prototype, "chatSessionId", void 0);
MessageMaxAggregateInput = __decorate([
    InputType()
], MessageMaxAggregateInput);
export { MessageMaxAggregateInput };
let MessageMaxAggregate = class MessageMaxAggregate {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageMaxAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMaxAggregate.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMaxAggregate.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMaxAggregate.prototype, "content", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMaxAggregate.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMaxAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMaxAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageMaxAggregate.prototype, "chatSessionId", void 0);
MessageMaxAggregate = __decorate([
    ObjectType()
], MessageMaxAggregate);
export { MessageMaxAggregate };
let MessageMaxOrderByAggregateInput = class MessageMaxOrderByAggregateInput {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMaxOrderByAggregateInput.prototype, "chatSessionId", void 0);
MessageMaxOrderByAggregateInput = __decorate([
    InputType()
], MessageMaxOrderByAggregateInput);
export { MessageMaxOrderByAggregateInput };
let MessageMinAggregateInput = class MessageMinAggregateInput {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageMinAggregateInput.prototype, "chatSessionId", void 0);
MessageMinAggregateInput = __decorate([
    InputType()
], MessageMinAggregateInput);
export { MessageMinAggregateInput };
let MessageMinAggregate = class MessageMinAggregate {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageMinAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMinAggregate.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMinAggregate.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageMinAggregate.prototype, "content", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMinAggregate.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMinAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageMinAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageMinAggregate.prototype, "chatSessionId", void 0);
MessageMinAggregate = __decorate([
    ObjectType()
], MessageMinAggregate);
export { MessageMinAggregate };
let MessageMinOrderByAggregateInput = class MessageMinOrderByAggregateInput {
    id;
    sender;
    type;
    content;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "sender", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "type", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "content", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageMinOrderByAggregateInput.prototype, "chatSessionId", void 0);
MessageMinOrderByAggregateInput = __decorate([
    InputType()
], MessageMinOrderByAggregateInput);
export { MessageMinOrderByAggregateInput };
let MessageOrderByRelationAggregateInput = class MessageOrderByRelationAggregateInput {
    _count;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByRelationAggregateInput.prototype, "_count", void 0);
MessageOrderByRelationAggregateInput = __decorate([
    InputType()
], MessageOrderByRelationAggregateInput);
export { MessageOrderByRelationAggregateInput };
let MessageOrderByWithAggregationInput = class MessageOrderByWithAggregationInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    _count;
    _avg;
    _max;
    _min;
    _sum;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "sender", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "type", void 0);
__decorate([
    Field(() => SortOrderInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "content", void 0);
__decorate([
    Field(() => SortOrderInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "payload", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => MessageCountOrderByAggregateInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "_count", void 0);
__decorate([
    Field(() => MessageAvgOrderByAggregateInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "_avg", void 0);
__decorate([
    Field(() => MessageMaxOrderByAggregateInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "_max", void 0);
__decorate([
    Field(() => MessageMinOrderByAggregateInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "_min", void 0);
__decorate([
    Field(() => MessageSumOrderByAggregateInput, { nullable: true })
], MessageOrderByWithAggregationInput.prototype, "_sum", void 0);
MessageOrderByWithAggregationInput = __decorate([
    InputType()
], MessageOrderByWithAggregationInput);
export { MessageOrderByWithAggregationInput };
let MessageOrderByWithRelationInput = class MessageOrderByWithRelationInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    chatSession;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "sender", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "type", void 0);
__decorate([
    Field(() => SortOrderInput, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "content", void 0);
__decorate([
    Field(() => SortOrderInput, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "payload", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => ChatSessionOrderByWithRelationInput, { nullable: true })
], MessageOrderByWithRelationInput.prototype, "chatSession", void 0);
MessageOrderByWithRelationInput = __decorate([
    InputType()
], MessageOrderByWithRelationInput);
export { MessageOrderByWithRelationInput };
let MessageScalarWhereWithAggregatesInput = MessageScalarWhereWithAggregatesInput_1 = class MessageScalarWhereWithAggregatesInput {
    AND;
    OR;
    NOT;
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => [MessageScalarWhereWithAggregatesInput_1], { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "AND", void 0);
__decorate([
    Field(() => [MessageScalarWhereWithAggregatesInput_1], { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "OR", void 0);
__decorate([
    Field(() => [MessageScalarWhereWithAggregatesInput_1], { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "id", void 0);
__decorate([
    Field(() => StringWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "sender", void 0);
__decorate([
    Field(() => StringWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "type", void 0);
__decorate([
    Field(() => StringNullableWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "content", void 0);
__decorate([
    Field(() => JsonNullableWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "payload", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntWithAggregatesFilter, { nullable: true })
], MessageScalarWhereWithAggregatesInput.prototype, "chatSessionId", void 0);
MessageScalarWhereWithAggregatesInput = MessageScalarWhereWithAggregatesInput_1 = __decorate([
    InputType()
], MessageScalarWhereWithAggregatesInput);
export { MessageScalarWhereWithAggregatesInput };
let MessageScalarWhereInput = MessageScalarWhereInput_1 = class MessageScalarWhereInput {
    AND;
    OR;
    NOT;
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => [MessageScalarWhereInput_1], { nullable: true })
], MessageScalarWhereInput.prototype, "AND", void 0);
__decorate([
    Field(() => [MessageScalarWhereInput_1], { nullable: true })
], MessageScalarWhereInput.prototype, "OR", void 0);
__decorate([
    Field(() => [MessageScalarWhereInput_1], { nullable: true })
], MessageScalarWhereInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "id", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "sender", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "type", void 0);
__decorate([
    Field(() => StringNullableFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "content", void 0);
__decorate([
    Field(() => JsonNullableFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "payload", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], MessageScalarWhereInput.prototype, "chatSessionId", void 0);
MessageScalarWhereInput = MessageScalarWhereInput_1 = __decorate([
    InputType()
], MessageScalarWhereInput);
export { MessageScalarWhereInput };
let MessageSumAggregateInput = class MessageSumAggregateInput {
    id;
    chatSessionId;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageSumAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], MessageSumAggregateInput.prototype, "chatSessionId", void 0);
MessageSumAggregateInput = __decorate([
    InputType()
], MessageSumAggregateInput);
export { MessageSumAggregateInput };
let MessageSumAggregate = class MessageSumAggregate {
    id;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageSumAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageSumAggregate.prototype, "chatSessionId", void 0);
MessageSumAggregate = __decorate([
    ObjectType()
], MessageSumAggregate);
export { MessageSumAggregate };
let MessageSumOrderByAggregateInput = class MessageSumOrderByAggregateInput {
    id;
    chatSessionId;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageSumOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], MessageSumOrderByAggregateInput.prototype, "chatSessionId", void 0);
MessageSumOrderByAggregateInput = __decorate([
    InputType()
], MessageSumOrderByAggregateInput);
export { MessageSumOrderByAggregateInput };
let MessageUncheckedCreateNestedManyWithoutChatSessionInput = class MessageUncheckedCreateNestedManyWithoutChatSessionInput {
    create;
    connectOrCreate;
    createMany;
    connect;
};
__decorate([
    Field(() => [MessageCreateWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageUncheckedCreateNestedManyWithoutChatSessionInput.prototype, "create", void 0);
__decorate([
    Field(() => [MessageCreateOrConnectWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateOrConnectWithoutChatSessionInput)
], MessageUncheckedCreateNestedManyWithoutChatSessionInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => MessageCreateManyChatSessionInputEnvelope, { nullable: true }),
    Type(() => MessageCreateManyChatSessionInputEnvelope)
], MessageUncheckedCreateNestedManyWithoutChatSessionInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUncheckedCreateNestedManyWithoutChatSessionInput.prototype, "connect", void 0);
MessageUncheckedCreateNestedManyWithoutChatSessionInput = __decorate([
    InputType()
], MessageUncheckedCreateNestedManyWithoutChatSessionInput);
export { MessageUncheckedCreateNestedManyWithoutChatSessionInput };
let MessageUncheckedCreateWithoutChatSessionInput = class MessageUncheckedCreateWithoutChatSessionInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateWithoutChatSessionInput.prototype, "updatedAt", void 0);
MessageUncheckedCreateWithoutChatSessionInput = __decorate([
    InputType()
], MessageUncheckedCreateWithoutChatSessionInput);
export { MessageUncheckedCreateWithoutChatSessionInput };
let MessageUncheckedCreateInput = class MessageUncheckedCreateInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedCreateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], MessageUncheckedCreateInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedCreateInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedCreateInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedCreateInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], MessageUncheckedCreateInput.prototype, "chatSessionId", void 0);
MessageUncheckedCreateInput = __decorate([
    InputType()
], MessageUncheckedCreateInput);
export { MessageUncheckedCreateInput };
let MessageUncheckedUpdateManyWithoutChatSessionNestedInput = class MessageUncheckedUpdateManyWithoutChatSessionNestedInput {
    create;
    connectOrCreate;
    upsert;
    createMany;
    set;
    disconnect;
    delete;
    connect;
    update;
    updateMany;
    deleteMany;
};
__decorate([
    Field(() => [MessageCreateWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => [MessageCreateOrConnectWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateOrConnectWithoutChatSessionInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => [MessageUpsertWithWhereUniqueWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpsertWithWhereUniqueWithoutChatSessionInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => MessageCreateManyChatSessionInputEnvelope, { nullable: true }),
    Type(() => MessageCreateManyChatSessionInputEnvelope)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "set", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "disconnect", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "delete", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => [MessageUpdateWithWhereUniqueWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpdateWithWhereUniqueWithoutChatSessionInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "update", void 0);
__decorate([
    Field(() => [MessageUpdateManyWithWhereWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpdateManyWithWhereWithoutChatSessionInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "updateMany", void 0);
__decorate([
    Field(() => [MessageScalarWhereInput], { nullable: true }),
    Type(() => MessageScalarWhereInput)
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput.prototype, "deleteMany", void 0);
MessageUncheckedUpdateManyWithoutChatSessionNestedInput = __decorate([
    InputType()
], MessageUncheckedUpdateManyWithoutChatSessionNestedInput);
export { MessageUncheckedUpdateManyWithoutChatSessionNestedInput };
let MessageUncheckedUpdateManyWithoutChatSessionInput = class MessageUncheckedUpdateManyWithoutChatSessionInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyWithoutChatSessionInput.prototype, "updatedAt", void 0);
MessageUncheckedUpdateManyWithoutChatSessionInput = __decorate([
    InputType()
], MessageUncheckedUpdateManyWithoutChatSessionInput);
export { MessageUncheckedUpdateManyWithoutChatSessionInput };
let MessageUncheckedUpdateManyInput = class MessageUncheckedUpdateManyInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateManyInput.prototype, "chatSessionId", void 0);
MessageUncheckedUpdateManyInput = __decorate([
    InputType()
], MessageUncheckedUpdateManyInput);
export { MessageUncheckedUpdateManyInput };
let MessageUncheckedUpdateWithoutChatSessionInput = class MessageUncheckedUpdateWithoutChatSessionInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateWithoutChatSessionInput.prototype, "updatedAt", void 0);
MessageUncheckedUpdateWithoutChatSessionInput = __decorate([
    InputType()
], MessageUncheckedUpdateWithoutChatSessionInput);
export { MessageUncheckedUpdateWithoutChatSessionInput };
let MessageUncheckedUpdateInput = class MessageUncheckedUpdateInput {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], MessageUncheckedUpdateInput.prototype, "chatSessionId", void 0);
MessageUncheckedUpdateInput = __decorate([
    InputType()
], MessageUncheckedUpdateInput);
export { MessageUncheckedUpdateInput };
let MessageUpdateManyMutationInput = class MessageUpdateManyMutationInput {
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateManyMutationInput.prototype, "updatedAt", void 0);
MessageUpdateManyMutationInput = __decorate([
    InputType()
], MessageUpdateManyMutationInput);
export { MessageUpdateManyMutationInput };
let MessageUpdateManyWithWhereWithoutChatSessionInput = class MessageUpdateManyWithWhereWithoutChatSessionInput {
    where;
    data;
};
__decorate([
    Field(() => MessageScalarWhereInput, { nullable: false }),
    Type(() => MessageScalarWhereInput)
], MessageUpdateManyWithWhereWithoutChatSessionInput.prototype, "where", void 0);
__decorate([
    Field(() => MessageUpdateManyMutationInput, { nullable: false }),
    Type(() => MessageUpdateManyMutationInput)
], MessageUpdateManyWithWhereWithoutChatSessionInput.prototype, "data", void 0);
MessageUpdateManyWithWhereWithoutChatSessionInput = __decorate([
    InputType()
], MessageUpdateManyWithWhereWithoutChatSessionInput);
export { MessageUpdateManyWithWhereWithoutChatSessionInput };
let MessageUpdateManyWithoutChatSessionNestedInput = class MessageUpdateManyWithoutChatSessionNestedInput {
    create;
    connectOrCreate;
    upsert;
    createMany;
    set;
    disconnect;
    delete;
    connect;
    update;
    updateMany;
    deleteMany;
};
__decorate([
    Field(() => [MessageCreateWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => [MessageCreateOrConnectWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageCreateOrConnectWithoutChatSessionInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => [MessageUpsertWithWhereUniqueWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpsertWithWhereUniqueWithoutChatSessionInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => MessageCreateManyChatSessionInputEnvelope, { nullable: true }),
    Type(() => MessageCreateManyChatSessionInputEnvelope)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "createMany", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "set", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "disconnect", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "delete", void 0);
__decorate([
    Field(() => [MessageWhereUniqueInput], { nullable: true }),
    Type(() => MessageWhereUniqueInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => [MessageUpdateWithWhereUniqueWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpdateWithWhereUniqueWithoutChatSessionInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "update", void 0);
__decorate([
    Field(() => [MessageUpdateManyWithWhereWithoutChatSessionInput], { nullable: true }),
    Type(() => MessageUpdateManyWithWhereWithoutChatSessionInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "updateMany", void 0);
__decorate([
    Field(() => [MessageScalarWhereInput], { nullable: true }),
    Type(() => MessageScalarWhereInput)
], MessageUpdateManyWithoutChatSessionNestedInput.prototype, "deleteMany", void 0);
MessageUpdateManyWithoutChatSessionNestedInput = __decorate([
    InputType()
], MessageUpdateManyWithoutChatSessionNestedInput);
export { MessageUpdateManyWithoutChatSessionNestedInput };
let MessageUpdateWithWhereUniqueWithoutChatSessionInput = class MessageUpdateWithWhereUniqueWithoutChatSessionInput {
    where;
    data;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], MessageUpdateWithWhereUniqueWithoutChatSessionInput.prototype, "where", void 0);
__decorate([
    Field(() => MessageUpdateWithoutChatSessionInput, { nullable: false }),
    Type(() => MessageUpdateWithoutChatSessionInput)
], MessageUpdateWithWhereUniqueWithoutChatSessionInput.prototype, "data", void 0);
MessageUpdateWithWhereUniqueWithoutChatSessionInput = __decorate([
    InputType()
], MessageUpdateWithWhereUniqueWithoutChatSessionInput);
export { MessageUpdateWithWhereUniqueWithoutChatSessionInput };
let MessageUpdateWithoutChatSessionInput = class MessageUpdateWithoutChatSessionInput {
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateWithoutChatSessionInput.prototype, "updatedAt", void 0);
MessageUpdateWithoutChatSessionInput = __decorate([
    InputType()
], MessageUpdateWithoutChatSessionInput);
export { MessageUpdateWithoutChatSessionInput };
let MessageUpdateInput = class MessageUpdateInput {
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSession;
};
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateInput.prototype, "sender", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateInput.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], MessageUpdateInput.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], MessageUpdateInput.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], MessageUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionUpdateOneRequiredWithoutMessagesNestedInput, { nullable: true })
], MessageUpdateInput.prototype, "chatSession", void 0);
MessageUpdateInput = __decorate([
    InputType()
], MessageUpdateInput);
export { MessageUpdateInput };
let MessageUpsertWithWhereUniqueWithoutChatSessionInput = class MessageUpsertWithWhereUniqueWithoutChatSessionInput {
    where;
    update;
    create;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], MessageUpsertWithWhereUniqueWithoutChatSessionInput.prototype, "where", void 0);
__decorate([
    Field(() => MessageUpdateWithoutChatSessionInput, { nullable: false }),
    Type(() => MessageUpdateWithoutChatSessionInput)
], MessageUpsertWithWhereUniqueWithoutChatSessionInput.prototype, "update", void 0);
__decorate([
    Field(() => MessageCreateWithoutChatSessionInput, { nullable: false }),
    Type(() => MessageCreateWithoutChatSessionInput)
], MessageUpsertWithWhereUniqueWithoutChatSessionInput.prototype, "create", void 0);
MessageUpsertWithWhereUniqueWithoutChatSessionInput = __decorate([
    InputType()
], MessageUpsertWithWhereUniqueWithoutChatSessionInput);
export { MessageUpsertWithWhereUniqueWithoutChatSessionInput };
let MessageWhereUniqueInput = class MessageWhereUniqueInput {
    id;
    AND;
    OR;
    NOT;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    chatSession;
};
__decorate([
    Field(() => Int, { nullable: true })
], MessageWhereUniqueInput.prototype, "id", void 0);
__decorate([
    Field(() => [MessageWhereInput], { nullable: true })
], MessageWhereUniqueInput.prototype, "AND", void 0);
__decorate([
    Field(() => [MessageWhereInput], { nullable: true })
], MessageWhereUniqueInput.prototype, "OR", void 0);
__decorate([
    Field(() => [MessageWhereInput], { nullable: true })
], MessageWhereUniqueInput.prototype, "NOT", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "sender", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "type", void 0);
__decorate([
    Field(() => StringNullableFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "content", void 0);
__decorate([
    Field(() => JsonNullableFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "payload", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => ChatSessionScalarRelationFilter, { nullable: true })
], MessageWhereUniqueInput.prototype, "chatSession", void 0);
MessageWhereUniqueInput = __decorate([
    InputType()
], MessageWhereUniqueInput);
export { MessageWhereUniqueInput };
let MessageWhereInput = MessageWhereInput_1 = class MessageWhereInput {
    AND;
    OR;
    NOT;
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    chatSession;
};
__decorate([
    Field(() => [MessageWhereInput_1], { nullable: true })
], MessageWhereInput.prototype, "AND", void 0);
__decorate([
    Field(() => [MessageWhereInput_1], { nullable: true })
], MessageWhereInput.prototype, "OR", void 0);
__decorate([
    Field(() => [MessageWhereInput_1], { nullable: true })
], MessageWhereInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], MessageWhereInput.prototype, "id", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageWhereInput.prototype, "sender", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], MessageWhereInput.prototype, "type", void 0);
__decorate([
    Field(() => StringNullableFilter, { nullable: true })
], MessageWhereInput.prototype, "content", void 0);
__decorate([
    Field(() => JsonNullableFilter, { nullable: true })
], MessageWhereInput.prototype, "payload", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereInput.prototype, "timestamp", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], MessageWhereInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], MessageWhereInput.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => ChatSessionScalarRelationFilter, { nullable: true })
], MessageWhereInput.prototype, "chatSession", void 0);
MessageWhereInput = MessageWhereInput_1 = __decorate([
    InputType()
], MessageWhereInput);
export { MessageWhereInput };
let Message = class Message {
    id;
    sender;
    type;
    content;
    payload;
    timestamp;
    createdAt;
    updatedAt;
    chatSessionId;
    chatSession;
};
__decorate([
    Field(() => ID, { nullable: false })
], Message.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], Message.prototype, "sender", void 0);
__decorate([
    Field(() => String, { defaultValue: 'text', nullable: false })
], Message.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true })
], Message.prototype, "content", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], Message.prototype, "payload", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], Message.prototype, "timestamp", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], Message.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], Message.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], Message.prototype, "chatSessionId", void 0);
__decorate([
    Field(() => ChatSession, { nullable: false })
], Message.prototype, "chatSession", void 0);
Message = __decorate([
    ObjectType()
], Message);
export { Message };
let UpdateManyMessageArgs = class UpdateManyMessageArgs {
    data;
    where;
};
__decorate([
    Field(() => MessageUpdateManyMutationInput, { nullable: false }),
    Type(() => MessageUpdateManyMutationInput)
], UpdateManyMessageArgs.prototype, "data", void 0);
__decorate([
    Field(() => MessageWhereInput, { nullable: true }),
    Type(() => MessageWhereInput)
], UpdateManyMessageArgs.prototype, "where", void 0);
UpdateManyMessageArgs = __decorate([
    ArgsType()
], UpdateManyMessageArgs);
export { UpdateManyMessageArgs };
let UpdateOneMessageArgs = class UpdateOneMessageArgs {
    data;
    where;
};
__decorate([
    Field(() => MessageUpdateInput, { nullable: false }),
    Type(() => MessageUpdateInput)
], UpdateOneMessageArgs.prototype, "data", void 0);
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], UpdateOneMessageArgs.prototype, "where", void 0);
UpdateOneMessageArgs = __decorate([
    ArgsType()
], UpdateOneMessageArgs);
export { UpdateOneMessageArgs };
let UpsertOneMessageArgs = class UpsertOneMessageArgs {
    where;
    create;
    update;
};
__decorate([
    Field(() => MessageWhereUniqueInput, { nullable: false }),
    Type(() => MessageWhereUniqueInput)
], UpsertOneMessageArgs.prototype, "where", void 0);
__decorate([
    Field(() => MessageCreateInput, { nullable: false }),
    Type(() => MessageCreateInput)
], UpsertOneMessageArgs.prototype, "create", void 0);
__decorate([
    Field(() => MessageUpdateInput, { nullable: false }),
    Type(() => MessageUpdateInput)
], UpsertOneMessageArgs.prototype, "update", void 0);
UpsertOneMessageArgs = __decorate([
    ArgsType()
], UpsertOneMessageArgs);
export { UpsertOneMessageArgs };
let AffectedRows = class AffectedRows {
    count;
};
__decorate([
    Field(() => Int, { nullable: false })
], AffectedRows.prototype, "count", void 0);
AffectedRows = __decorate([
    ObjectType()
], AffectedRows);
export { AffectedRows };
let DateTimeFilter = class DateTimeFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], DateTimeFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], DateTimeFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedDateTimeFilter, { nullable: true })
], DateTimeFilter.prototype, "not", void 0);
DateTimeFilter = __decorate([
    InputType()
], DateTimeFilter);
export { DateTimeFilter };
let DateTimeWithAggregatesFilter = class DateTimeWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedDateTimeWithAggregatesFilter, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedDateTimeFilter, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedDateTimeFilter, { nullable: true })
], DateTimeWithAggregatesFilter.prototype, "_max", void 0);
DateTimeWithAggregatesFilter = __decorate([
    InputType()
], DateTimeWithAggregatesFilter);
export { DateTimeWithAggregatesFilter };
let EnumUserRoleFilter = class EnumUserRoleFilter {
    equals;
    in;
    notIn;
    not;
};
__decorate([
    Field(() => UserRole, { nullable: true })
], EnumUserRoleFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], EnumUserRoleFilter.prototype, "in", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], EnumUserRoleFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter, { nullable: true })
], EnumUserRoleFilter.prototype, "not", void 0);
EnumUserRoleFilter = __decorate([
    InputType()
], EnumUserRoleFilter);
export { EnumUserRoleFilter };
let EnumUserRoleWithAggregatesFilter = class EnumUserRoleWithAggregatesFilter {
    equals;
    in;
    notIn;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => UserRole, { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => NestedEnumUserRoleWithAggregatesFilter, { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter, { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter, { nullable: true })
], EnumUserRoleWithAggregatesFilter.prototype, "_max", void 0);
EnumUserRoleWithAggregatesFilter = __decorate([
    InputType()
], EnumUserRoleWithAggregatesFilter);
export { EnumUserRoleWithAggregatesFilter };
let IntFilter = class IntFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Int, { nullable: true })
], IntFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], IntFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], IntFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], IntFilter.prototype, "not", void 0);
IntFilter = __decorate([
    InputType()
], IntFilter);
export { IntFilter };
let IntWithAggregatesFilter = class IntWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => Int, { nullable: true })
], IntWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], IntWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], IntWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], IntWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedIntWithAggregatesFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedFloatFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "_avg", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "_sum", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], IntWithAggregatesFilter.prototype, "_max", void 0);
IntWithAggregatesFilter = __decorate([
    InputType()
], IntWithAggregatesFilter);
export { IntWithAggregatesFilter };
let JsonNullableFilter = class JsonNullableFilter {
    equals;
    path;
    string_contains;
    string_starts_with;
    string_ends_with;
    array_contains;
    array_starts_with;
    array_ends_with;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], JsonNullableFilter.prototype, "path", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableFilter.prototype, "string_contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableFilter.prototype, "string_starts_with", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableFilter.prototype, "string_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "array_contains", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "array_starts_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "array_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "lt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "lte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "gt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "gte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableFilter.prototype, "not", void 0);
JsonNullableFilter = __decorate([
    InputType()
], JsonNullableFilter);
export { JsonNullableFilter };
let JsonNullableWithAggregatesFilter = class JsonNullableWithAggregatesFilter {
    equals;
    path;
    string_contains;
    string_starts_with;
    string_ends_with;
    array_contains;
    array_starts_with;
    array_ends_with;
    lt;
    lte;
    gt;
    gte;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "path", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "string_contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "string_starts_with", void 0);
__decorate([
    Field(() => String, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "string_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "array_contains", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "array_starts_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "array_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntNullableFilter, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedJsonNullableFilter, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedJsonNullableFilter, { nullable: true })
], JsonNullableWithAggregatesFilter.prototype, "_max", void 0);
JsonNullableWithAggregatesFilter = __decorate([
    InputType()
], JsonNullableWithAggregatesFilter);
export { JsonNullableWithAggregatesFilter };
let NestedDateTimeFilter = NestedDateTimeFilter_1 = class NestedDateTimeFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], NestedDateTimeFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], NestedDateTimeFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedDateTimeFilter_1, { nullable: true })
], NestedDateTimeFilter.prototype, "not", void 0);
NestedDateTimeFilter = NestedDateTimeFilter_1 = __decorate([
    InputType()
], NestedDateTimeFilter);
export { NestedDateTimeFilter };
let NestedDateTimeWithAggregatesFilter = NestedDateTimeWithAggregatesFilter_1 = class NestedDateTimeWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Date], { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedDateTimeWithAggregatesFilter_1, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedDateTimeFilter, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedDateTimeFilter, { nullable: true })
], NestedDateTimeWithAggregatesFilter.prototype, "_max", void 0);
NestedDateTimeWithAggregatesFilter = NestedDateTimeWithAggregatesFilter_1 = __decorate([
    InputType()
], NestedDateTimeWithAggregatesFilter);
export { NestedDateTimeWithAggregatesFilter };
let NestedEnumUserRoleFilter = NestedEnumUserRoleFilter_1 = class NestedEnumUserRoleFilter {
    equals;
    in;
    notIn;
    not;
};
__decorate([
    Field(() => UserRole, { nullable: true })
], NestedEnumUserRoleFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], NestedEnumUserRoleFilter.prototype, "in", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], NestedEnumUserRoleFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter_1, { nullable: true })
], NestedEnumUserRoleFilter.prototype, "not", void 0);
NestedEnumUserRoleFilter = NestedEnumUserRoleFilter_1 = __decorate([
    InputType()
], NestedEnumUserRoleFilter);
export { NestedEnumUserRoleFilter };
let NestedEnumUserRoleWithAggregatesFilter = NestedEnumUserRoleWithAggregatesFilter_1 = class NestedEnumUserRoleWithAggregatesFilter {
    equals;
    in;
    notIn;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => UserRole, { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [UserRole], { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => NestedEnumUserRoleWithAggregatesFilter_1, { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter, { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedEnumUserRoleFilter, { nullable: true })
], NestedEnumUserRoleWithAggregatesFilter.prototype, "_max", void 0);
NestedEnumUserRoleWithAggregatesFilter = NestedEnumUserRoleWithAggregatesFilter_1 = __decorate([
    InputType()
], NestedEnumUserRoleWithAggregatesFilter);
export { NestedEnumUserRoleWithAggregatesFilter };
let NestedFloatFilter = NestedFloatFilter_1 = class NestedFloatFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Float, { nullable: true })
], NestedFloatFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Float], { nullable: true })
], NestedFloatFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Float], { nullable: true })
], NestedFloatFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], NestedFloatFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], NestedFloatFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], NestedFloatFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Float, { nullable: true })
], NestedFloatFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedFloatFilter_1, { nullable: true })
], NestedFloatFilter.prototype, "not", void 0);
NestedFloatFilter = NestedFloatFilter_1 = __decorate([
    InputType()
], NestedFloatFilter);
export { NestedFloatFilter };
let NestedIntFilter = NestedIntFilter_1 = class NestedIntFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedIntFilter_1, { nullable: true })
], NestedIntFilter.prototype, "not", void 0);
NestedIntFilter = NestedIntFilter_1 = __decorate([
    InputType()
], NestedIntFilter);
export { NestedIntFilter };
let NestedIntNullableFilter = NestedIntNullableFilter_1 = class NestedIntNullableFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntNullableFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntNullableFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntNullableFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntNullableFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntNullableFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntNullableFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntNullableFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedIntNullableFilter_1, { nullable: true })
], NestedIntNullableFilter.prototype, "not", void 0);
NestedIntNullableFilter = NestedIntNullableFilter_1 = __decorate([
    InputType()
], NestedIntNullableFilter);
export { NestedIntNullableFilter };
let NestedIntWithAggregatesFilter = NestedIntWithAggregatesFilter_1 = class NestedIntWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    not;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [Int], { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => NestedIntWithAggregatesFilter_1, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedFloatFilter, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "_avg", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "_sum", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedIntWithAggregatesFilter.prototype, "_max", void 0);
NestedIntWithAggregatesFilter = NestedIntWithAggregatesFilter_1 = __decorate([
    InputType()
], NestedIntWithAggregatesFilter);
export { NestedIntWithAggregatesFilter };
let NestedJsonNullableFilter = class NestedJsonNullableFilter {
    equals;
    path;
    string_contains;
    string_starts_with;
    string_ends_with;
    array_contains;
    array_starts_with;
    array_ends_with;
    lt;
    lte;
    gt;
    gte;
    not;
};
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedJsonNullableFilter.prototype, "path", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedJsonNullableFilter.prototype, "string_contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedJsonNullableFilter.prototype, "string_starts_with", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedJsonNullableFilter.prototype, "string_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "array_contains", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "array_starts_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "array_ends_with", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "lt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "lte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "gt", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "gte", void 0);
__decorate([
    Field(() => GraphQLJSON, { nullable: true })
], NestedJsonNullableFilter.prototype, "not", void 0);
NestedJsonNullableFilter = __decorate([
    InputType()
], NestedJsonNullableFilter);
export { NestedJsonNullableFilter };
let NestedStringFilter = NestedStringFilter_1 = class NestedStringFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    not;
};
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => NestedStringFilter_1, { nullable: true })
], NestedStringFilter.prototype, "not", void 0);
NestedStringFilter = NestedStringFilter_1 = __decorate([
    InputType()
], NestedStringFilter);
export { NestedStringFilter };
let NestedStringNullableFilter = NestedStringNullableFilter_1 = class NestedStringNullableFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    not;
};
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringNullableFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringNullableFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => NestedStringNullableFilter_1, { nullable: true })
], NestedStringNullableFilter.prototype, "not", void 0);
NestedStringNullableFilter = NestedStringNullableFilter_1 = __decorate([
    InputType()
], NestedStringNullableFilter);
export { NestedStringNullableFilter };
let NestedStringNullableWithAggregatesFilter = NestedStringNullableWithAggregatesFilter_1 = class NestedStringNullableWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => NestedStringNullableWithAggregatesFilter_1, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntNullableFilter, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedStringNullableFilter, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedStringNullableFilter, { nullable: true })
], NestedStringNullableWithAggregatesFilter.prototype, "_max", void 0);
NestedStringNullableWithAggregatesFilter = NestedStringNullableWithAggregatesFilter_1 = __decorate([
    InputType()
], NestedStringNullableWithAggregatesFilter);
export { NestedStringNullableWithAggregatesFilter };
let NestedStringWithAggregatesFilter = NestedStringWithAggregatesFilter_1 = class NestedStringWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => NestedStringWithAggregatesFilter_1, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedStringFilter, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedStringFilter, { nullable: true })
], NestedStringWithAggregatesFilter.prototype, "_max", void 0);
NestedStringWithAggregatesFilter = NestedStringWithAggregatesFilter_1 = __decorate([
    InputType()
], NestedStringWithAggregatesFilter);
export { NestedStringWithAggregatesFilter };
let SortOrderInput = class SortOrderInput {
    sort;
    nulls;
};
__decorate([
    Field(() => SortOrder, { nullable: false })
], SortOrderInput.prototype, "sort", void 0);
__decorate([
    Field(() => NullsOrder, { nullable: true })
], SortOrderInput.prototype, "nulls", void 0);
SortOrderInput = __decorate([
    InputType()
], SortOrderInput);
export { SortOrderInput };
let StringFilter = class StringFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    mode;
    not;
};
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => QueryMode, { nullable: true })
], StringFilter.prototype, "mode", void 0);
__decorate([
    Field(() => NestedStringFilter, { nullable: true })
], StringFilter.prototype, "not", void 0);
StringFilter = __decorate([
    InputType()
], StringFilter);
export { StringFilter };
let StringNullableFilter = class StringNullableFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    mode;
    not;
};
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringNullableFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringNullableFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => QueryMode, { nullable: true })
], StringNullableFilter.prototype, "mode", void 0);
__decorate([
    Field(() => NestedStringNullableFilter, { nullable: true })
], StringNullableFilter.prototype, "not", void 0);
StringNullableFilter = __decorate([
    InputType()
], StringNullableFilter);
export { StringNullableFilter };
let StringNullableWithAggregatesFilter = class StringNullableWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    mode;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => QueryMode, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "mode", void 0);
__decorate([
    Field(() => NestedStringNullableWithAggregatesFilter, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntNullableFilter, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedStringNullableFilter, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedStringNullableFilter, { nullable: true })
], StringNullableWithAggregatesFilter.prototype, "_max", void 0);
StringNullableWithAggregatesFilter = __decorate([
    InputType()
], StringNullableWithAggregatesFilter);
export { StringNullableWithAggregatesFilter };
let StringWithAggregatesFilter = class StringWithAggregatesFilter {
    equals;
    in;
    notIn;
    lt;
    lte;
    gt;
    gte;
    contains;
    startsWith;
    endsWith;
    mode;
    not;
    _count;
    _min;
    _max;
};
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "equals", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringWithAggregatesFilter.prototype, "in", void 0);
__decorate([
    Field(() => [String], { nullable: true })
], StringWithAggregatesFilter.prototype, "notIn", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "lt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "lte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "gt", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "gte", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "contains", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "startsWith", void 0);
__decorate([
    Field(() => String, { nullable: true })
], StringWithAggregatesFilter.prototype, "endsWith", void 0);
__decorate([
    Field(() => QueryMode, { nullable: true })
], StringWithAggregatesFilter.prototype, "mode", void 0);
__decorate([
    Field(() => NestedStringWithAggregatesFilter, { nullable: true })
], StringWithAggregatesFilter.prototype, "not", void 0);
__decorate([
    Field(() => NestedIntFilter, { nullable: true })
], StringWithAggregatesFilter.prototype, "_count", void 0);
__decorate([
    Field(() => NestedStringFilter, { nullable: true })
], StringWithAggregatesFilter.prototype, "_min", void 0);
__decorate([
    Field(() => NestedStringFilter, { nullable: true })
], StringWithAggregatesFilter.prototype, "_max", void 0);
StringWithAggregatesFilter = __decorate([
    InputType()
], StringWithAggregatesFilter);
export { StringWithAggregatesFilter };
let AggregateUser = class AggregateUser {
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => UserCountAggregate, { nullable: true })
], AggregateUser.prototype, "_count", void 0);
__decorate([
    Field(() => UserAvgAggregate, { nullable: true })
], AggregateUser.prototype, "_avg", void 0);
__decorate([
    Field(() => UserSumAggregate, { nullable: true })
], AggregateUser.prototype, "_sum", void 0);
__decorate([
    Field(() => UserMinAggregate, { nullable: true })
], AggregateUser.prototype, "_min", void 0);
__decorate([
    Field(() => UserMaxAggregate, { nullable: true })
], AggregateUser.prototype, "_max", void 0);
AggregateUser = __decorate([
    ObjectType()
], AggregateUser);
export { AggregateUser };
let CreateManyUserArgs = class CreateManyUserArgs {
    data;
    skipDuplicates;
};
__decorate([
    Field(() => [UserCreateManyInput], { nullable: false }),
    Type(() => UserCreateManyInput)
], CreateManyUserArgs.prototype, "data", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], CreateManyUserArgs.prototype, "skipDuplicates", void 0);
CreateManyUserArgs = __decorate([
    ArgsType()
], CreateManyUserArgs);
export { CreateManyUserArgs };
let CreateOneUserArgs = class CreateOneUserArgs {
    data;
};
__decorate([
    Field(() => UserCreateInput, { nullable: false }),
    Type(() => UserCreateInput)
], CreateOneUserArgs.prototype, "data", void 0);
CreateOneUserArgs = __decorate([
    ArgsType()
], CreateOneUserArgs);
export { CreateOneUserArgs };
let DeleteManyUserArgs = class DeleteManyUserArgs {
    where;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], DeleteManyUserArgs.prototype, "where", void 0);
DeleteManyUserArgs = __decorate([
    ArgsType()
], DeleteManyUserArgs);
export { DeleteManyUserArgs };
let DeleteOneUserArgs = class DeleteOneUserArgs {
    where;
};
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], DeleteOneUserArgs.prototype, "where", void 0);
DeleteOneUserArgs = __decorate([
    ArgsType()
], DeleteOneUserArgs);
export { DeleteOneUserArgs };
let FindFirstUserOrThrowArgs = class FindFirstUserOrThrowArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], FindFirstUserOrThrowArgs.prototype, "where", void 0);
__decorate([
    Field(() => [UserOrderByWithRelationInput], { nullable: true })
], FindFirstUserOrThrowArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true })
], FindFirstUserOrThrowArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstUserOrThrowArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstUserOrThrowArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [UserScalarFieldEnum], { nullable: true })
], FindFirstUserOrThrowArgs.prototype, "distinct", void 0);
FindFirstUserOrThrowArgs = __decorate([
    ArgsType()
], FindFirstUserOrThrowArgs);
export { FindFirstUserOrThrowArgs };
let FindFirstUserArgs = class FindFirstUserArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], FindFirstUserArgs.prototype, "where", void 0);
__decorate([
    Field(() => [UserOrderByWithRelationInput], { nullable: true })
], FindFirstUserArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true })
], FindFirstUserArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstUserArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindFirstUserArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [UserScalarFieldEnum], { nullable: true })
], FindFirstUserArgs.prototype, "distinct", void 0);
FindFirstUserArgs = __decorate([
    ArgsType()
], FindFirstUserArgs);
export { FindFirstUserArgs };
let FindManyUserArgs = class FindManyUserArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    distinct;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], FindManyUserArgs.prototype, "where", void 0);
__decorate([
    Field(() => [UserOrderByWithRelationInput], { nullable: true })
], FindManyUserArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true })
], FindManyUserArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyUserArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], FindManyUserArgs.prototype, "skip", void 0);
__decorate([
    Field(() => [UserScalarFieldEnum], { nullable: true })
], FindManyUserArgs.prototype, "distinct", void 0);
FindManyUserArgs = __decorate([
    ArgsType()
], FindManyUserArgs);
export { FindManyUserArgs };
let FindUniqueUserOrThrowArgs = class FindUniqueUserOrThrowArgs {
    where;
};
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], FindUniqueUserOrThrowArgs.prototype, "where", void 0);
FindUniqueUserOrThrowArgs = __decorate([
    ArgsType()
], FindUniqueUserOrThrowArgs);
export { FindUniqueUserOrThrowArgs };
let FindUniqueUserArgs = class FindUniqueUserArgs {
    where;
};
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], FindUniqueUserArgs.prototype, "where", void 0);
FindUniqueUserArgs = __decorate([
    ArgsType()
], FindUniqueUserArgs);
export { FindUniqueUserArgs };
let UpdateManyUserArgs = class UpdateManyUserArgs {
    data;
    where;
};
__decorate([
    Field(() => UserUpdateManyMutationInput, { nullable: false }),
    Type(() => UserUpdateManyMutationInput)
], UpdateManyUserArgs.prototype, "data", void 0);
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], UpdateManyUserArgs.prototype, "where", void 0);
UpdateManyUserArgs = __decorate([
    ArgsType()
], UpdateManyUserArgs);
export { UpdateManyUserArgs };
let UpdateOneUserArgs = class UpdateOneUserArgs {
    data;
    where;
};
__decorate([
    Field(() => UserUpdateInput, { nullable: false }),
    Type(() => UserUpdateInput)
], UpdateOneUserArgs.prototype, "data", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], UpdateOneUserArgs.prototype, "where", void 0);
UpdateOneUserArgs = __decorate([
    ArgsType()
], UpdateOneUserArgs);
export { UpdateOneUserArgs };
let UpsertOneUserArgs = class UpsertOneUserArgs {
    where;
    create;
    update;
};
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], UpsertOneUserArgs.prototype, "where", void 0);
__decorate([
    Field(() => UserCreateInput, { nullable: false }),
    Type(() => UserCreateInput)
], UpsertOneUserArgs.prototype, "create", void 0);
__decorate([
    Field(() => UserUpdateInput, { nullable: false }),
    Type(() => UserUpdateInput)
], UpsertOneUserArgs.prototype, "update", void 0);
UpsertOneUserArgs = __decorate([
    ArgsType()
], UpsertOneUserArgs);
export { UpsertOneUserArgs };
let UserAggregateArgs = class UserAggregateArgs {
    where;
    orderBy;
    cursor;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], UserAggregateArgs.prototype, "where", void 0);
__decorate([
    Field(() => [UserOrderByWithRelationInput], { nullable: true })
], UserAggregateArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true })
], UserAggregateArgs.prototype, "cursor", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], UserAggregateArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], UserAggregateArgs.prototype, "skip", void 0);
__decorate([
    Field(() => UserCountAggregateInput, { nullable: true })
], UserAggregateArgs.prototype, "_count", void 0);
__decorate([
    Field(() => UserAvgAggregateInput, { nullable: true })
], UserAggregateArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => UserSumAggregateInput, { nullable: true })
], UserAggregateArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => UserMinAggregateInput, { nullable: true })
], UserAggregateArgs.prototype, "_min", void 0);
__decorate([
    Field(() => UserMaxAggregateInput, { nullable: true })
], UserAggregateArgs.prototype, "_max", void 0);
UserAggregateArgs = __decorate([
    ArgsType()
], UserAggregateArgs);
export { UserAggregateArgs };
let UserAvgAggregateInput = class UserAvgAggregateInput {
    id;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], UserAvgAggregateInput.prototype, "id", void 0);
UserAvgAggregateInput = __decorate([
    InputType()
], UserAvgAggregateInput);
export { UserAvgAggregateInput };
let UserAvgAggregate = class UserAvgAggregate {
    id;
};
__decorate([
    Field(() => Float, { nullable: true })
], UserAvgAggregate.prototype, "id", void 0);
UserAvgAggregate = __decorate([
    ObjectType()
], UserAvgAggregate);
export { UserAvgAggregate };
let UserAvgOrderByAggregateInput = class UserAvgOrderByAggregateInput {
    id;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserAvgOrderByAggregateInput.prototype, "id", void 0);
UserAvgOrderByAggregateInput = __decorate([
    InputType()
], UserAvgOrderByAggregateInput);
export { UserAvgOrderByAggregateInput };
let UserCountAggregateInput = class UserCountAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    _all;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserCountAggregateInput.prototype, "_all", void 0);
UserCountAggregateInput = __decorate([
    InputType()
], UserCountAggregateInput);
export { UserCountAggregateInput };
let UserCountAggregate = class UserCountAggregate {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    _all;
};
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "id", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "email", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "password", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "role", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "updatedAt", void 0);
__decorate([
    Field(() => Int, { nullable: false })
], UserCountAggregate.prototype, "_all", void 0);
UserCountAggregate = __decorate([
    ObjectType()
], UserCountAggregate);
export { UserCountAggregate };
let UserCountOrderByAggregateInput = class UserCountOrderByAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserCountOrderByAggregateInput.prototype, "updatedAt", void 0);
UserCountOrderByAggregateInput = __decorate([
    InputType()
], UserCountOrderByAggregateInput);
export { UserCountOrderByAggregateInput };
let UserCount = class UserCount {
    chatSessions;
};
__decorate([
    Field(() => Int, { nullable: false })
], UserCount.prototype, "chatSessions", void 0);
UserCount = __decorate([
    ObjectType()
], UserCount);
export { UserCount };
let UserCreateManyInput = class UserCreateManyInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserCreateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsEmail()
], UserCreateManyInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserCreateManyInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserCreateManyInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateManyInput.prototype, "updatedAt", void 0);
UserCreateManyInput = __decorate([
    InputType()
], UserCreateManyInput);
export { UserCreateManyInput };
let UserCreateNestedOneWithoutChatSessionsInput = class UserCreateNestedOneWithoutChatSessionsInput {
    create;
    connectOrCreate;
    connect;
};
__decorate([
    Field(() => UserCreateWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserCreateWithoutChatSessionsInput)
], UserCreateNestedOneWithoutChatSessionsInput.prototype, "create", void 0);
__decorate([
    Field(() => UserCreateOrConnectWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserCreateOrConnectWithoutChatSessionsInput)
], UserCreateNestedOneWithoutChatSessionsInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true }),
    Type(() => UserWhereUniqueInput)
], UserCreateNestedOneWithoutChatSessionsInput.prototype, "connect", void 0);
UserCreateNestedOneWithoutChatSessionsInput = __decorate([
    InputType()
], UserCreateNestedOneWithoutChatSessionsInput);
export { UserCreateNestedOneWithoutChatSessionsInput };
let UserCreateOrConnectWithoutChatSessionsInput = class UserCreateOrConnectWithoutChatSessionsInput {
    where;
    create;
};
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: false }),
    Type(() => UserWhereUniqueInput)
], UserCreateOrConnectWithoutChatSessionsInput.prototype, "where", void 0);
__decorate([
    Field(() => UserCreateWithoutChatSessionsInput, { nullable: false }),
    Type(() => UserCreateWithoutChatSessionsInput)
], UserCreateOrConnectWithoutChatSessionsInput.prototype, "create", void 0);
UserCreateOrConnectWithoutChatSessionsInput = __decorate([
    InputType()
], UserCreateOrConnectWithoutChatSessionsInput);
export { UserCreateOrConnectWithoutChatSessionsInput };
let UserCreateWithoutChatSessionsInput = class UserCreateWithoutChatSessionsInput {
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsEmail()
], UserCreateWithoutChatSessionsInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserCreateWithoutChatSessionsInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserCreateWithoutChatSessionsInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateWithoutChatSessionsInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateWithoutChatSessionsInput.prototype, "updatedAt", void 0);
UserCreateWithoutChatSessionsInput = __decorate([
    InputType()
], UserCreateWithoutChatSessionsInput);
export { UserCreateWithoutChatSessionsInput };
let UserCreateInput = class UserCreateInput {
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsEmail()
], UserCreateInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserCreateInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserCreateInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionCreateNestedManyWithoutUserInput, { nullable: true })
], UserCreateInput.prototype, "chatSessions", void 0);
UserCreateInput = __decorate([
    InputType()
], UserCreateInput);
export { UserCreateInput };
let UserGroupByArgs = class UserGroupByArgs {
    where;
    orderBy;
    by;
    having;
    take;
    skip;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], UserGroupByArgs.prototype, "where", void 0);
__decorate([
    Field(() => [UserOrderByWithAggregationInput], { nullable: true })
], UserGroupByArgs.prototype, "orderBy", void 0);
__decorate([
    Field(() => [UserScalarFieldEnum], { nullable: false })
], UserGroupByArgs.prototype, "by", void 0);
__decorate([
    Field(() => UserScalarWhereWithAggregatesInput, { nullable: true })
], UserGroupByArgs.prototype, "having", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], UserGroupByArgs.prototype, "take", void 0);
__decorate([
    Field(() => Int, { nullable: true })
], UserGroupByArgs.prototype, "skip", void 0);
__decorate([
    Field(() => UserCountAggregateInput, { nullable: true })
], UserGroupByArgs.prototype, "_count", void 0);
__decorate([
    Field(() => UserAvgAggregateInput, { nullable: true })
], UserGroupByArgs.prototype, "_avg", void 0);
__decorate([
    Field(() => UserSumAggregateInput, { nullable: true })
], UserGroupByArgs.prototype, "_sum", void 0);
__decorate([
    Field(() => UserMinAggregateInput, { nullable: true })
], UserGroupByArgs.prototype, "_min", void 0);
__decorate([
    Field(() => UserMaxAggregateInput, { nullable: true })
], UserGroupByArgs.prototype, "_max", void 0);
UserGroupByArgs = __decorate([
    ArgsType()
], UserGroupByArgs);
export { UserGroupByArgs };
let UserGroupBy = class UserGroupBy {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    _count;
    _avg;
    _sum;
    _min;
    _max;
};
__decorate([
    Field(() => Int, { nullable: false })
], UserGroupBy.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], UserGroupBy.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false })
], UserGroupBy.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: false })
], UserGroupBy.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], UserGroupBy.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], UserGroupBy.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserCountAggregate, { nullable: true })
], UserGroupBy.prototype, "_count", void 0);
__decorate([
    Field(() => UserAvgAggregate, { nullable: true })
], UserGroupBy.prototype, "_avg", void 0);
__decorate([
    Field(() => UserSumAggregate, { nullable: true })
], UserGroupBy.prototype, "_sum", void 0);
__decorate([
    Field(() => UserMinAggregate, { nullable: true })
], UserGroupBy.prototype, "_min", void 0);
__decorate([
    Field(() => UserMaxAggregate, { nullable: true })
], UserGroupBy.prototype, "_max", void 0);
UserGroupBy = __decorate([
    ObjectType()
], UserGroupBy);
export { UserGroupBy };
let UserMaxAggregateInput = class UserMaxAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMaxAggregateInput.prototype, "updatedAt", void 0);
UserMaxAggregateInput = __decorate([
    InputType()
], UserMaxAggregateInput);
export { UserMaxAggregateInput };
let UserMaxAggregate = class UserMaxAggregate {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserMaxAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], UserMaxAggregate.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true })
], UserMaxAggregate.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserMaxAggregate.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserMaxAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserMaxAggregate.prototype, "updatedAt", void 0);
UserMaxAggregate = __decorate([
    ObjectType()
], UserMaxAggregate);
export { UserMaxAggregate };
let UserMaxOrderByAggregateInput = class UserMaxOrderByAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMaxOrderByAggregateInput.prototype, "updatedAt", void 0);
UserMaxOrderByAggregateInput = __decorate([
    InputType()
], UserMaxOrderByAggregateInput);
export { UserMaxOrderByAggregateInput };
let UserMinAggregateInput = class UserMinAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Boolean, { nullable: true })
], UserMinAggregateInput.prototype, "updatedAt", void 0);
UserMinAggregateInput = __decorate([
    InputType()
], UserMinAggregateInput);
export { UserMinAggregateInput };
let UserMinAggregate = class UserMinAggregate {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserMinAggregate.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true })
], UserMinAggregate.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true })
], UserMinAggregate.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserMinAggregate.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserMinAggregate.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserMinAggregate.prototype, "updatedAt", void 0);
UserMinAggregate = __decorate([
    ObjectType()
], UserMinAggregate);
export { UserMinAggregate };
let UserMinOrderByAggregateInput = class UserMinOrderByAggregateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "email", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "password", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "role", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserMinOrderByAggregateInput.prototype, "updatedAt", void 0);
UserMinOrderByAggregateInput = __decorate([
    InputType()
], UserMinOrderByAggregateInput);
export { UserMinOrderByAggregateInput };
let UserOrderByWithAggregationInput = class UserOrderByWithAggregationInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    _count;
    _avg;
    _max;
    _min;
    _sum;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "email", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "password", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "role", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => UserCountOrderByAggregateInput, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "_count", void 0);
__decorate([
    Field(() => UserAvgOrderByAggregateInput, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "_avg", void 0);
__decorate([
    Field(() => UserMaxOrderByAggregateInput, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "_max", void 0);
__decorate([
    Field(() => UserMinOrderByAggregateInput, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "_min", void 0);
__decorate([
    Field(() => UserSumOrderByAggregateInput, { nullable: true })
], UserOrderByWithAggregationInput.prototype, "_sum", void 0);
UserOrderByWithAggregationInput = __decorate([
    InputType()
], UserOrderByWithAggregationInput);
export { UserOrderByWithAggregationInput };
let UserOrderByWithRelationInput = class UserOrderByWithRelationInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "id", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "email", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "password", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "role", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserOrderByWithRelationInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionOrderByRelationAggregateInput, { nullable: true })
], UserOrderByWithRelationInput.prototype, "chatSessions", void 0);
UserOrderByWithRelationInput = __decorate([
    InputType()
], UserOrderByWithRelationInput);
export { UserOrderByWithRelationInput };
let UserScalarRelationFilter = class UserScalarRelationFilter {
    is;
    isNot;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true })
], UserScalarRelationFilter.prototype, "is", void 0);
__decorate([
    Field(() => UserWhereInput, { nullable: true })
], UserScalarRelationFilter.prototype, "isNot", void 0);
UserScalarRelationFilter = __decorate([
    InputType()
], UserScalarRelationFilter);
export { UserScalarRelationFilter };
let UserScalarWhereWithAggregatesInput = UserScalarWhereWithAggregatesInput_1 = class UserScalarWhereWithAggregatesInput {
    AND;
    OR;
    NOT;
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => [UserScalarWhereWithAggregatesInput_1], { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "AND", void 0);
__decorate([
    Field(() => [UserScalarWhereWithAggregatesInput_1], { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "OR", void 0);
__decorate([
    Field(() => [UserScalarWhereWithAggregatesInput_1], { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "id", void 0);
__decorate([
    Field(() => StringWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "email", void 0);
__decorate([
    Field(() => StringWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "password", void 0);
__decorate([
    Field(() => EnumUserRoleWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "role", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeWithAggregatesFilter, { nullable: true })
], UserScalarWhereWithAggregatesInput.prototype, "updatedAt", void 0);
UserScalarWhereWithAggregatesInput = UserScalarWhereWithAggregatesInput_1 = __decorate([
    InputType()
], UserScalarWhereWithAggregatesInput);
export { UserScalarWhereWithAggregatesInput };
let UserSumAggregateInput = class UserSumAggregateInput {
    id;
};
__decorate([
    Field(() => Boolean, { nullable: true })
], UserSumAggregateInput.prototype, "id", void 0);
UserSumAggregateInput = __decorate([
    InputType()
], UserSumAggregateInput);
export { UserSumAggregateInput };
let UserSumAggregate = class UserSumAggregate {
    id;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserSumAggregate.prototype, "id", void 0);
UserSumAggregate = __decorate([
    ObjectType()
], UserSumAggregate);
export { UserSumAggregate };
let UserSumOrderByAggregateInput = class UserSumOrderByAggregateInput {
    id;
};
__decorate([
    Field(() => SortOrder, { nullable: true })
], UserSumOrderByAggregateInput.prototype, "id", void 0);
UserSumOrderByAggregateInput = __decorate([
    InputType()
], UserSumOrderByAggregateInput);
export { UserSumOrderByAggregateInput };
let UserUncheckedCreateWithoutChatSessionsInput = class UserUncheckedCreateWithoutChatSessionsInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsEmail()
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedCreateWithoutChatSessionsInput.prototype, "updatedAt", void 0);
UserUncheckedCreateWithoutChatSessionsInput = __decorate([
    InputType()
], UserUncheckedCreateWithoutChatSessionsInput);
export { UserUncheckedCreateWithoutChatSessionsInput };
let UserUncheckedCreateInput = class UserUncheckedCreateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserUncheckedCreateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsEmail()
], UserUncheckedCreateInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUncheckedCreateInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUncheckedCreateInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedCreateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedCreateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
], UserUncheckedCreateInput.prototype, "chatSessions", void 0);
UserUncheckedCreateInput = __decorate([
    InputType()
], UserUncheckedCreateInput);
export { UserUncheckedCreateInput };
let UserUncheckedUpdateManyInput = class UserUncheckedUpdateManyInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserUncheckedUpdateManyInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUncheckedUpdateManyInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUncheckedUpdateManyInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUncheckedUpdateManyInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateManyInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateManyInput.prototype, "updatedAt", void 0);
UserUncheckedUpdateManyInput = __decorate([
    InputType()
], UserUncheckedUpdateManyInput);
export { UserUncheckedUpdateManyInput };
let UserUncheckedUpdateWithoutChatSessionsInput = class UserUncheckedUpdateWithoutChatSessionsInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateWithoutChatSessionsInput.prototype, "updatedAt", void 0);
UserUncheckedUpdateWithoutChatSessionsInput = __decorate([
    InputType()
], UserUncheckedUpdateWithoutChatSessionsInput);
export { UserUncheckedUpdateWithoutChatSessionsInput };
let UserUncheckedUpdateInput = class UserUncheckedUpdateInput {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserUncheckedUpdateInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUncheckedUpdateInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUncheckedUpdateInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUncheckedUpdateInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUncheckedUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionUncheckedUpdateManyWithoutUserNestedInput, { nullable: true })
], UserUncheckedUpdateInput.prototype, "chatSessions", void 0);
UserUncheckedUpdateInput = __decorate([
    InputType()
], UserUncheckedUpdateInput);
export { UserUncheckedUpdateInput };
let UserUpdateManyMutationInput = class UserUpdateManyMutationInput {
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUpdateManyMutationInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUpdateManyMutationInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUpdateManyMutationInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateManyMutationInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateManyMutationInput.prototype, "updatedAt", void 0);
UserUpdateManyMutationInput = __decorate([
    InputType()
], UserUpdateManyMutationInput);
export { UserUpdateManyMutationInput };
let UserUpdateOneRequiredWithoutChatSessionsNestedInput = class UserUpdateOneRequiredWithoutChatSessionsNestedInput {
    create;
    connectOrCreate;
    upsert;
    connect;
    update;
};
__decorate([
    Field(() => UserCreateWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserCreateWithoutChatSessionsInput)
], UserUpdateOneRequiredWithoutChatSessionsNestedInput.prototype, "create", void 0);
__decorate([
    Field(() => UserCreateOrConnectWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserCreateOrConnectWithoutChatSessionsInput)
], UserUpdateOneRequiredWithoutChatSessionsNestedInput.prototype, "connectOrCreate", void 0);
__decorate([
    Field(() => UserUpsertWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserUpsertWithoutChatSessionsInput)
], UserUpdateOneRequiredWithoutChatSessionsNestedInput.prototype, "upsert", void 0);
__decorate([
    Field(() => UserWhereUniqueInput, { nullable: true }),
    Type(() => UserWhereUniqueInput)
], UserUpdateOneRequiredWithoutChatSessionsNestedInput.prototype, "connect", void 0);
__decorate([
    Field(() => UserUpdateToOneWithWhereWithoutChatSessionsInput, { nullable: true }),
    Type(() => UserUpdateToOneWithWhereWithoutChatSessionsInput)
], UserUpdateOneRequiredWithoutChatSessionsNestedInput.prototype, "update", void 0);
UserUpdateOneRequiredWithoutChatSessionsNestedInput = __decorate([
    InputType()
], UserUpdateOneRequiredWithoutChatSessionsNestedInput);
export { UserUpdateOneRequiredWithoutChatSessionsNestedInput };
let UserUpdateToOneWithWhereWithoutChatSessionsInput = class UserUpdateToOneWithWhereWithoutChatSessionsInput {
    where;
    data;
};
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], UserUpdateToOneWithWhereWithoutChatSessionsInput.prototype, "where", void 0);
__decorate([
    Field(() => UserUpdateWithoutChatSessionsInput, { nullable: false }),
    Type(() => UserUpdateWithoutChatSessionsInput)
], UserUpdateToOneWithWhereWithoutChatSessionsInput.prototype, "data", void 0);
UserUpdateToOneWithWhereWithoutChatSessionsInput = __decorate([
    InputType()
], UserUpdateToOneWithWhereWithoutChatSessionsInput);
export { UserUpdateToOneWithWhereWithoutChatSessionsInput };
let UserUpdateWithoutChatSessionsInput = class UserUpdateWithoutChatSessionsInput {
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUpdateWithoutChatSessionsInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUpdateWithoutChatSessionsInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUpdateWithoutChatSessionsInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateWithoutChatSessionsInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateWithoutChatSessionsInput.prototype, "updatedAt", void 0);
UserUpdateWithoutChatSessionsInput = __decorate([
    InputType()
], UserUpdateWithoutChatSessionsInput);
export { UserUpdateWithoutChatSessionsInput };
let UserUpdateInput = class UserUpdateInput {
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserUpdateInput.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsString(),
    Validator.MinLength(8)
], UserUpdateInput.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { nullable: true })
], UserUpdateInput.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: true })
], UserUpdateInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionUpdateManyWithoutUserNestedInput, { nullable: true })
], UserUpdateInput.prototype, "chatSessions", void 0);
UserUpdateInput = __decorate([
    InputType()
], UserUpdateInput);
export { UserUpdateInput };
let UserUpsertWithoutChatSessionsInput = class UserUpsertWithoutChatSessionsInput {
    update;
    create;
    where;
};
__decorate([
    Field(() => UserUpdateWithoutChatSessionsInput, { nullable: false }),
    Type(() => UserUpdateWithoutChatSessionsInput)
], UserUpsertWithoutChatSessionsInput.prototype, "update", void 0);
__decorate([
    Field(() => UserCreateWithoutChatSessionsInput, { nullable: false }),
    Type(() => UserCreateWithoutChatSessionsInput)
], UserUpsertWithoutChatSessionsInput.prototype, "create", void 0);
__decorate([
    Field(() => UserWhereInput, { nullable: true }),
    Type(() => UserWhereInput)
], UserUpsertWithoutChatSessionsInput.prototype, "where", void 0);
UserUpsertWithoutChatSessionsInput = __decorate([
    InputType()
], UserUpsertWithoutChatSessionsInput);
export { UserUpsertWithoutChatSessionsInput };
let UserWhereUniqueInput = class UserWhereUniqueInput {
    id;
    email;
    AND;
    OR;
    NOT;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => Int, { nullable: true })
], UserWhereUniqueInput.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    Validator.IsEmail()
], UserWhereUniqueInput.prototype, "email", void 0);
__decorate([
    Field(() => [UserWhereInput], { nullable: true })
], UserWhereUniqueInput.prototype, "AND", void 0);
__decorate([
    Field(() => [UserWhereInput], { nullable: true })
], UserWhereUniqueInput.prototype, "OR", void 0);
__decorate([
    Field(() => [UserWhereInput], { nullable: true })
], UserWhereUniqueInput.prototype, "NOT", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], UserWhereUniqueInput.prototype, "password", void 0);
__decorate([
    Field(() => EnumUserRoleFilter, { nullable: true })
], UserWhereUniqueInput.prototype, "role", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], UserWhereUniqueInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], UserWhereUniqueInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionListRelationFilter, { nullable: true })
], UserWhereUniqueInput.prototype, "chatSessions", void 0);
UserWhereUniqueInput = __decorate([
    InputType()
], UserWhereUniqueInput);
export { UserWhereUniqueInput };
let UserWhereInput = UserWhereInput_1 = class UserWhereInput {
    AND;
    OR;
    NOT;
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
};
__decorate([
    Field(() => [UserWhereInput_1], { nullable: true })
], UserWhereInput.prototype, "AND", void 0);
__decorate([
    Field(() => [UserWhereInput_1], { nullable: true })
], UserWhereInput.prototype, "OR", void 0);
__decorate([
    Field(() => [UserWhereInput_1], { nullable: true })
], UserWhereInput.prototype, "NOT", void 0);
__decorate([
    Field(() => IntFilter, { nullable: true })
], UserWhereInput.prototype, "id", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], UserWhereInput.prototype, "email", void 0);
__decorate([
    Field(() => StringFilter, { nullable: true })
], UserWhereInput.prototype, "password", void 0);
__decorate([
    Field(() => EnumUserRoleFilter, { nullable: true })
], UserWhereInput.prototype, "role", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], UserWhereInput.prototype, "createdAt", void 0);
__decorate([
    Field(() => DateTimeFilter, { nullable: true })
], UserWhereInput.prototype, "updatedAt", void 0);
__decorate([
    Field(() => ChatSessionListRelationFilter, { nullable: true })
], UserWhereInput.prototype, "chatSessions", void 0);
UserWhereInput = UserWhereInput_1 = __decorate([
    InputType()
], UserWhereInput);
export { UserWhereInput };
let User = class User {
    id;
    email;
    password;
    role;
    createdAt;
    updatedAt;
    chatSessions;
    _count;
};
__decorate([
    Field(() => ID, { nullable: false })
], User.prototype, "id", void 0);
__decorate([
    Field(() => String, { nullable: false })
], User.prototype, "email", void 0);
__decorate([
    Field(() => String, { nullable: false })
], User.prototype, "password", void 0);
__decorate([
    Field(() => UserRole, { defaultValue: 'USER', nullable: false })
], User.prototype, "role", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], User.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date, { nullable: false })
], User.prototype, "updatedAt", void 0);
__decorate([
    Field(() => [ChatSession], { nullable: true })
], User.prototype, "chatSessions", void 0);
__decorate([
    Field(() => UserCount, { nullable: false })
], User.prototype, "_count", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };
//# sourceMappingURL=index.js.map