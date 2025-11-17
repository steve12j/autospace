import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql'
import { Prisma } from 'generated/prisma'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
})

@InputType()
export class UserOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      UserOrderByWithRelationInputStrict,
      Omit<
        Prisma.UserOrderByWithRelationInput,
        'Credentials' | 'AuthProvider' | 'Admin'
      >
    >
{
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  // Todo: Add below field decorator to the SortOrder properties.
}

@InputType()
export class UserOrderByWithRelationInput extends PartialType(
  UserOrderByWithRelationInputStrict,
) {}

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
