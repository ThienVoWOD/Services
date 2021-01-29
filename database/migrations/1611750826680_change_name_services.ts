import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChangeNameServices extends BaseSchema {
  protected tableName = 'change_name_services'

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
      .integer("change_name_id")
      .unsigned()
      .references("id")
      .inTable("change_names")
      .onDelete("CASCADE");
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
