import { registerEnumType } from '@nestjs/graphql';

export enum TestScalarFieldEnum {
    id = "id",
    update = "update",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TestScalarFieldEnum, { name: 'TestScalarFieldEnum', description: undefined })
