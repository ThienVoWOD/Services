import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class BuffLikeCustomer extends BaseSchema {
  protected tableName = "buff_like_customers";

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
        .integer("buff_like_id")
        .unsigned()
        .references("id")
        .inTable("buff_likes")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
