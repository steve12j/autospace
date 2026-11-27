import { Field, ObjectType } from '@nestjs/graphql'
import { User as UserType } from '@/generated/prisma_client/client.js'
import { RestrictProperties } from '@/common/dtos/common.input.js'

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  uid: string
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  name: string | null
  @Field({ nullable: true })
  image: string | null
}
