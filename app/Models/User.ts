import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import sellPage from 'App/Models/SellPage';
import changeName from 'App/Models/ChangeName';
import BuffLike from 'App/Models/BuffLike';
import customerType from "App/Models/CustomerType";
import tz from 'timezone';
const asia = tz(require('timezone/Asia'))

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column()
  public link_fb: string;

  @column()
  public role: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return asia(value, "%d/%m/%Y %H:%M", "Asia/Ho_Chi_Minh");
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value?: DateTime) => {
      return asia(value, "%d/%m/%Y %H:%M", "Asia/Ho_Chi_Minh");
    },
  })
  public updatedAt: DateTime;

  @manyToMany(() => sellPage, {
    pivotTable: "sell_page_customers",
    pivotRelatedForeignKey: "sell_page_id",
  })
  public sellPage: ManyToMany<typeof sellPage>;

  @manyToMany(() => BuffLike, {
    pivotTable: "buff_like_customers",
    pivotRelatedForeignKey: "buff_like_id",
  })
  public buffLike: ManyToMany<typeof BuffLike>;

  @manyToMany(() => changeName, {
    pivotTable: "change_name_customers",
    pivotRelatedForeignKey: "change_name_id",
  })
  public changeName: ManyToMany<typeof changeName>;

  @manyToMany(() => customerType, {
    pivotTable: "user_customer_types",
    pivotRelatedForeignKey: "customer_type_id",
  })
  public customerType: ManyToMany<typeof customerType>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
