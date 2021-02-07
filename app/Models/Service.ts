import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import sellPage from 'App/Models/SellPage';
import changeName from "App/Models/ChangeName";
import BuffLike from 'App/Models/BuffLike';

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => sellPage, {
    pivotTable: "sell_page_services",
    pivotRelatedForeignKey: "sell_page_id",
  })
  public sellPage: ManyToMany<typeof sellPage>;

  @manyToMany(() => changeName, {
    pivotTable: "change_name_services",
    pivotRelatedForeignKey: "change_name_id",
  })
  public changeName: ManyToMany<typeof changeName>;

  @manyToMany(() => BuffLike, {
    pivotTable: "buff_like_services",
    pivotRelatedForeignKey: "buff_like_id",
  })
  public buffLike: ManyToMany<typeof BuffLike>;
}
