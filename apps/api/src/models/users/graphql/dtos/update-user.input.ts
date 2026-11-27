import { InputType, PartialType } from '@nestjs/graphql'
import { User as UserType } from '@/generated/prisma_client/client.js'
import { User } from '../entity/user.entity.js'

@InputType()
export class UpdateUserInput extends PartialType(User) {
  uid: UserType['uid']
}
