import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Inventories extends BaseSchema {
  protected tableName = "inventories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.integer("price").defaultTo("0");
      table.string("note");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
