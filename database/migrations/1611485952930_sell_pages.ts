import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SellPages extends BaseSchema {
  protected tableName = 'sell_pages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name");
      table.integer("number_of_like").defaultTo(0);
      table.integer("price").defaultTo(0);
      table.enum("status", ["Chưa xử lý", "Đang xử lý", "Chưa thanh toán", "Đã thanh toán"]);
      table.string("note");
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
