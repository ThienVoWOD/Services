import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CustomerTypes extends BaseSchema {
  protected tableName = "customer_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.integer("sell_page_price").defaultTo("0");
      table.integer("change_name_price").defaultTo("0");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
