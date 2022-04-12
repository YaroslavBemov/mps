import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import BaseProcedure from './BaseProcedure'

export default class BaseMtp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public productId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @hasMany(() => BaseProcedure)
  public baseProcedures: HasMany<typeof BaseProcedure>
}
