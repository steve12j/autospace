import { Module } from '@nestjs/common'
import { UsersService } from '@/models/users/graphql/users.service.js'
import { UsersResolver } from '@/models/users/graphql/users.resolver.js'
import { UsersController } from '@/models/users/rest/users.controller.js'

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
