import { CreateUserInput } from '@/models/users/graphql/dtos/create-user.input.js'
import { InputType, PartialType } from '@nestjs/graphql'
import { User } from '@/generated/prisma_client/client.js'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  uid: User['uid']
}
