import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Processes extends BaseSchema {
  protected tableName = 'processes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('procedure_id').unsigned().references('procedures.id').onDelete('CASCADE')
      table.integer('worker_id').unsigned().references('workers.id').onDelete('CASCADE')
      table.timestamp('time_start', { useTz: true })
      table.timestamp('time_finish', { useTz: true })
      table.text('comment')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
