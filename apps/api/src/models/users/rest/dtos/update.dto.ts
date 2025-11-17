import { CreateUser } from './create.dto'
import { User } from 'generated/prisma'
import { PartialType } from '@nestjs/swagger'

export class UpdateUser extends PartialType(CreateUser) {
  uid: User['uid']
}
