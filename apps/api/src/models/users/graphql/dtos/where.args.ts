import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@/generated/prisma_client/client.js'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from '@/common/dtos/common.input.js'

@InputType()
export class UserWhereUniqueInput {
  @Field()
  uid: string
}

@InputType()
export class UserWhereInputStrict implements RestrictProperties<
  UserWhereInputStrict,
  Omit<
    Prisma.UserWhereInput,
    'Credentials' | 'AuthProvider' | 'Admin' | 'AND' | 'OR' | 'NOT'
  >
> {
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  name: StringFilter

  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {
  AND?: UserWhereInput[]
  OR?: UserWhereInput[]
  NOT?: UserWhereInput[]
}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}
