import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Processes extends BaseSchema {
  protected tableName = 'processes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('worker_id')
        .unsigned()
        .references('workers.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('procedure_id')
        .unsigned()
        .references('procedures.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('statuses.id')
        .onDelete('CASCADE')
        .notNullable()
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
