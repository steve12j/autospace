import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@/generated/prisma_client/client.js'
import { BaseQueryDto } from '@/common/dtos/common.dto.js'

export class UserQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.UserScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.UserScalarFieldEnum))
  searchBy?: string
}
