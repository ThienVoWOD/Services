import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Stores extends BaseSchema {
  protected tableName = "stores";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.enum("type", ["Like", "Page", "Follow"]);
      table.string("link_fb");
      table.string("note");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
