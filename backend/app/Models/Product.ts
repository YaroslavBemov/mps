import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseMtp from './BaseMtp'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => BaseMtp)
  public baseMtps: HasMany<typeof BaseMtp>
}
