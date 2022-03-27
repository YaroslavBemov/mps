import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
