import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';

@InputType()
export class EnumUserRoleFilter {

    @Field(() => UserRole, {nullable:true})
    equals?: keyof typeof UserRole;

    @Field(() => [UserRole], {nullable:true})
    in?: Array<keyof typeof UserRole>;

    @Field(() => [UserRole], {nullable:true})
    notIn?: Array<keyof typeof UserRole>;

    @Field(() => EnumUserRoleFilter, {nullable:true})
    not?: EnumUserRoleFilter;
}
