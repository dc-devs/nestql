import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';
import { IntFilter } from './int-filter.input';
import { EnumUserRoleFilter } from './enum-user-role-filter.input';

@InputType()
export class EnumUserRoleWithAggregatesFilter {

    @Field(() => UserRole, {nullable:true})
    equals?: keyof typeof UserRole;

    @Field(() => [UserRole], {nullable:true})
    in?: Array<keyof typeof UserRole>;

    @Field(() => [UserRole], {nullable:true})
    notIn?: Array<keyof typeof UserRole>;

    @Field(() => EnumUserRoleWithAggregatesFilter, {nullable:true})
    not?: EnumUserRoleWithAggregatesFilter;

    @Field(() => IntFilter, {nullable:true})
    _count?: IntFilter;

    @Field(() => EnumUserRoleFilter, {nullable:true})
    _min?: EnumUserRoleFilter;

    @Field(() => EnumUserRoleFilter, {nullable:true})
    _max?: EnumUserRoleFilter;
}
