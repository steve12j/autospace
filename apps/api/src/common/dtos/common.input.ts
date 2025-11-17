import {
  ArgsType,
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Prisma } from 'generated/prisma'

// Prisma v6 no longer exports `Prisma.QueryMode` directly
// So define these enums manually
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(QueryMode, { name: 'QueryMode' })
registerEnumType(SortOrder, { name: 'SortOrder' })

export type RestrictProperties<T, U> = {
  [K in keyof T]: K extends keyof U ? T[K] : never
} & Required<U>

// implements Prisma.DateTimeFilter
@InputType()
export class DateTimeFilter {
  equals?: string;
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
}

@InputType()
export class StringFilter {
  equals?: string;
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string

  @Field(() => QueryMode, { nullable: true })
  mode?: Prisma.QueryMode
}

@InputType()
export class StringListFilter {
  equals?: string[]
  has?: string
  hasEvery?: string[]
  hasSome?: string[]
  isEmpty?: boolean
}

@InputType()
export class BoolFilter {
  equals?: boolean
  not?: boolean
}

@InputType()
export class IntFilter {
  equals?: number
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

@InputType()
export class FloatFilter {
  equals?: number
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number
}

@ObjectType()
export class AggregateCountOutput {
  count: number
}

@InputType()
export class LocationFilterInput {
  @Field(() => Float)
  ne_lat: number

  @Field(() => Float)
  ne_lng: number

  @Field(() => Float)
  sw_lat: number

  @Field(() => Float)
  sw_lng: number
}

@ArgsType()
export class PaginationInput {
  take?: number
  skip?: number
}
