import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Worker from './Worker'
import Procedure from './Procedure'
import Status from './Status'

export default class Process extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public workerId: number

  @column()
  public procedureId: number

  @column()
  public statusId: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Worker)
  public worker: BelongsTo<typeof Worker>

  @belongsTo(() => Procedure)
  public procedure: BelongsTo<typeof Procedure>

  @belongsTo(() => Status)
  public status: BelongsTo<typeof Status>
}
