import { User } from 'generated/prisma'
import { CreateUserInput } from './create-user.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  uid: User['uid']
}
