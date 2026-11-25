import { InputType, PickType } from '@nestjs/graphql'
import { User } from '@/models/users/graphql/entity/user.entity.js'

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['uid', 'name'],
  InputType,
) {}
