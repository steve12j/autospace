import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  FindManyUserArgs,
  FindUniqueUserArgs,
} from '@/models/users/graphql/dtos/find.args.js'
import { PrismaService } from '@/common/prisma/prisma.service.js'
import {
  LoginInput,
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from '@/models/users/graphql/dtos/create-user.input.js'
import { UpdateUserInput } from '@/models/users/graphql/dtos/update-user.input.js'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  registerWithProvider({ image, name, type, uid }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  async registerWithCredentials({
    email,
    name,
    password,
    image,
  }: RegisterWithCredentialsInput) {
    const exsistingUser = await this.prisma.credentials.findUnique({
      where: {
        email,
      },
    })

    if (exsistingUser) {
      throw new BadRequestException('User already exsists with this mail')
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    const uid = uuid()

    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
      },
      include: {
        Credentials: true,
      },
    })
  }

  async login({ email, password }: LoginInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        Credentials: {
          email,
        },
      },
      include: {
        Credentials: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      user.Credentials!.passwordHash,
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const jwtToken = this.jwtService.sign(
      { uid: user.uid },
      {
        algorithm: 'HS256',
      },
    )

    return { token: jwtToken }
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
