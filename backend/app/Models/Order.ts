import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import BaseMtp from './BaseMtp'
import Mtp from './Mtp'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public productId: number

  @column()
  public count: number

  @column()
  public baseMtpId: number

  @column()
  public isCreated: boolean

  @column()
  public isStarted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => BaseMtp)
  public baseMtp: BelongsTo<typeof BaseMtp>

  @hasMany(() => Mtp)
  public mtps: HasMany<typeof Mtp>
}
