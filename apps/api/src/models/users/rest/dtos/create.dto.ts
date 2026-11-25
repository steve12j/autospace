import { OmitType, PickType } from '@nestjs/swagger'
import { UserEntity } from '@/models/users/rest/entity/user.entity.js'

export class CreateUser extends PickType(UserEntity, ['uid', 'name']) {}
