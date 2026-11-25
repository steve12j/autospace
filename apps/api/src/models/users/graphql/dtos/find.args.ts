import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@/generated/prisma_client/client.js'
import { UserOrderByWithRelationInput } from '@/models/users/graphql/dtos/order-by.args.js'
import {
  UserWhereInput,
  UserWhereUniqueInput,
} from '@/models/users/graphql/dtos/where.args.js'
import { RestrictProperties } from '@/common/dtos/common.input.js'

registerEnumType(Prisma.UserScalarFieldEnum, {
  name: 'UserScalarFieldEnum',
})

@ArgsType()
class FindManyUserArgsStrict implements RestrictProperties<
  FindManyUserArgsStrict,
  Omit<Prisma.UserFindManyArgs, 'include' | 'select' | 'omit'>
> {
  where: UserWhereInput
  orderBy: UserOrderByWithRelationInput[]
  cursor: UserWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.UserScalarFieldEnum])
  distinct: Prisma.UserScalarFieldEnum[]
}

@ArgsType()
export class FindManyUserArgs extends PartialType(FindManyUserArgsStrict) {}

@ArgsType()
export class FindUniqueUserArgs {
  where: UserWhereUniqueInput
}
