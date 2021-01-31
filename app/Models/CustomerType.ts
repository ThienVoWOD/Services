import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import user from "App/Models/User";

export default class CustomerType extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public sell_page_price: number;

  @column()
  public change_name_price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => user, {
    pivotTable: "user_customer_types",
    pivotRelatedForeignKey: "user_id",
  })
  public user: ManyToMany<typeof user>;
}
