import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Inventory from "App/Models/Inventory";
import moment from "moment";

moment.locale("vi");

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public link_fb: string;

  @column()
  public note: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Inventory, {
    pivotTable: "store_has_inventories",
    pivotRelatedForeignKey: "inventory_id",
  })
  public inventory: ManyToMany<typeof Inventory>;
}
