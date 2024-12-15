import { registerEnumType } from '@nestjs/graphql';

export enum TweetFetchHistoryScalarFieldEnum {
    id = "id",
    name = "name",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TweetFetchHistoryScalarFieldEnum, { name: 'TweetFetchHistoryScalarFieldEnum', description: undefined })
