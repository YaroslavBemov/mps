import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Procedures extends BaseSchema {
  protected tableName = 'procedures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('mtp_id').unsigned().references('mtps.id').onDelete('CASCADE').notNullable()
      table.integer('position').unsigned().notNullable()
      table.string('title').notNullable()
      table.integer('sector_id').unsigned().references('sectors.id').onDelete('CASCADE')
      table
        .integer('status_id')
        .unsigned()
        .references('statuses.id')
        .onDelete('CASCADE')
        .defaultTo(1)
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
