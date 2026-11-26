import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from '@/models/users/graphql/users.service.js'
import { User } from '@/models/users/graphql/entity/user.entity.js'
import {
  FindManyUserArgs,
  FindUniqueUserArgs,
} from '@/models/users/graphql/dtos/find.args.js'
import { CreateUserInput } from '@/models/users/graphql/dtos/create-user.input.js'
import { UpdateUserInput } from '@/models/users/graphql/dtos/update-user.input.js'
import { checkRowLevelPermission } from '@/common/auth/util.js'
import type { GetUserType } from '@/common/types/index.js'
import { AllowAuthenticated, GetUser } from '@/common/auth/auth.decorator.js'
import { PrismaService } from '@/common/prisma/prisma.service.js'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') args: CreateUserInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.usersService.create(args)
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.where.uid)
    return this.usersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    const userInfo = await this.prisma.user.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, userInfo?.uid)
    return this.usersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(
    @Args() args: FindUniqueUserArgs,
    @GetUser() user: GetUserType,
  ) {
    const userInfo = await this.prisma.user.findUnique(args)
    checkRowLevelPermission(user, userInfo?.uid)
    return this.usersService.remove(args)
  }
}
