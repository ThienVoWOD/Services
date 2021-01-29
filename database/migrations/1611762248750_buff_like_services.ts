import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BuffLikeServices extends BaseSchema {
  protected tableName = 'buff_like_services'

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
    .integer("buff_like_id")
    .unsigned()
    .references("id")
    .inTable("buff_likes")
    .onDelete("CASCADE");
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
