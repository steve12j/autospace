import { Injectable } from '@nestjs/common'
import {
  FindManyUserArgs,
  FindUniqueUserArgs,
} from '@/models/users/graphql/dtos/find.args.js'
import { PrismaService } from '@/common/prisma/prisma.service.js'
import { CreateUserInput } from '@/models/users/graphql/dtos/create-user.input.js'
import { UpdateUserInput } from '@/models/users/graphql/dtos/update-user.input.js'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput,
    })
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
