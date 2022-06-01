import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from 'App/Models/Department'
import BaseProcedure from './BaseProcedure'

export default class Sector extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public step: number

  @column()
  public departmentId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>

  @hasMany(() => BaseProcedure)
  public baseProcedures: HasMany<typeof BaseProcedure>
}
