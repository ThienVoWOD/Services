import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SellPageServices extends BaseSchema {
  protected tableName = 'sell_page_services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("service_id")
        .unsigned()
        .references("id")
        .inTable("services")
        .onDelete("CASCADE");
      table
      .integer("sell_page_id")
      .unsigned()
      .references("id")
      .inTable("sell_pages")
      .onDelete("CASCADE");
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
