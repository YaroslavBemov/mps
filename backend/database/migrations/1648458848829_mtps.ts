import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mtps extends BaseSchema {
  protected tableName = 'mtps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE').notNullable()
      table.integer('serial').unsigned().notNullable()

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
