import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class StoreHasInventories extends BaseSchema {
  protected tableName = "store_has_inventories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("store_id")
        .unsigned()
        .references("id")
        .inTable("stores")
        .onDelete("CASCADE");
      table
        .integer("inventory_id")
        .unsigned()
        .references("id")
        .inTable("inventories")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
