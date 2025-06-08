import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { PrismaService } from 'src/util/prisma'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({ data: createUserInput })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return `This action returns a #${id} user`
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      data: updateUserInput,
      where: {
        uid: id,
      },
    })
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
