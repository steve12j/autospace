import { PartialType } from '@nestjs/swagger'
import { CreateUser } from '@/models/users/rest/dtos/create.dto.js'
import { User } from '@/generated/prisma_client/client.js'

export class UpdateUser extends PartialType(CreateUser) {
  uid: User['uid']
}
