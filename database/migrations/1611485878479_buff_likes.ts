import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BuffLikes extends BaseSchema {
  protected tableName = 'buff_likes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name");
      table.string("link_page");
      table.integer("need_to_increase").defaultTo(0);
      // table.integer("rate_1like").defaultTo(0);
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
