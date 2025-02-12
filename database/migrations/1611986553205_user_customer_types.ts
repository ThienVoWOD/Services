import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UserCustomerTypes extends BaseSchema {
  protected tableName = "user_customer_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("customer_type_id")
        .unsigned()
        .references("id")
        .inTable("customer_types")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
