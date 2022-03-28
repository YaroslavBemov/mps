import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Process extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public procedureId: number

  @column()
  public workerId: number

  @column.dateTime({ autoCreate: true })
  public timeStart: DateTime

  @column.dateTime()
  public timeFinish: DateTime

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
