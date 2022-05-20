import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sectors extends BaseSchema {
  protected tableName = 'sectors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.integer('step').unsigned()
      table
        .integer('department_id')
        .unsigned()
        .references('departments.id')
        .onDelete('CASCADE')
        .notNullable()
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
