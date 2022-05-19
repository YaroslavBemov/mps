import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sector from './Sector'
import Status from './Status'
import Mtp from './Mtp'

export default class Procedure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mtpId: number

  @column()
  public position: number

  @column()
  public title: string

  @column()
  public sectorId: number

  @column()
  public statusId: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sector)
  public sector: BelongsTo<typeof Sector>

  @belongsTo(() => Status)
  public status: BelongsTo<typeof Status>

  @belongsTo(() => Mtp)
  public mtp: BelongsTo<typeof Mtp>
}
