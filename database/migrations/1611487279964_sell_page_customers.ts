import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class SellPageCustomer extends BaseSchema {
  protected tableName = "sell_page_customers";

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
        .integer("sell_page_id")
        .unsigned()
        .references("id")
        .inTable("sell_pages")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
