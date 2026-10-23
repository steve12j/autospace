import { Module } from '@nestjs/common'
import { UsersService } from './users.service.js'
import { UsersResolver } from './users.resolver.js'
import { PrismaService } from '../util/prisma.service.js'

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
