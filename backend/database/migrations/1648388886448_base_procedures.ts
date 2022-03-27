import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BaseProcedures extends BaseSchema {
  protected tableName = 'base_procedures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('base_mtp_id').unsigned().references('base_mtps.id').onDelete('CASCADE')
      table.integer('position').unsigned()
      table.string('title')
      table.integer('sector_id').unsigned().references('sectors.id').onDelete('CASCADE')
      table.integer('time_total').unsigned()
      table.integer('time_per_product').unsigned()
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
