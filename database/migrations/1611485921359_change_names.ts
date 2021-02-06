import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChangeNames extends BaseSchema {
  protected tableName = 'change_names'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name");
      table.string("new_name");
      table.string("link_page");
      table.integer("price").defaultTo(0);
      table.string("status");
      table.string("note");
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
