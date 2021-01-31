import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ChangeNameCustomer extends BaseSchema {
  protected tableName = "change_name_customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("change_name_id")
        .unsigned()
        .references("id")
        .inTable("change_names")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
