import { User } from '@/generated/prisma_client/client.js'
import { IsOptional } from 'class-validator'
import { RestrictProperties } from '@/common/dtos/common.input.js'

export class UserEntity implements RestrictProperties<UserEntity, User> {
  uid: string
  createdAt: Date
  updatedAt: Date
  @IsOptional()
  name: string | null
  @IsOptional()
  image: string | null
}
