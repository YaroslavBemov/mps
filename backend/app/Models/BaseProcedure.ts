import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseMtp from './BaseMtp'
import Sector from './Sector'

export default class BaseProcedure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public baseMtpId: number

  @column()
  public position: number

  @column()
  public title: string

  @column()
  public sectorId: number

  @column()
  public timeTotal: number

  @column()
  public timePerProduct: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => BaseMtp)
  public baseMtp: BelongsTo<typeof BaseMtp>

  @belongsTo(() => Sector)
  public sector: BelongsTo<typeof Sector>
}
