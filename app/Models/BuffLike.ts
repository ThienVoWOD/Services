import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Service from 'App/Models/Service';
import tz from 'timezone'
const asia = tz(require('timezone/Asia'))

export default class BuffLike extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public link_page: string;

  @column()
  public need_to_increase: number;

  @column()
  public price: number;

  @column()
  public status: string;

  @column()
  public note: string;

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return asia(value, '%d/%m/%Y %H:%M', 'Asia/Ho_Chi_Minh')
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true, autoUpdate: true,
    serialize: (value?: DateTime) => {
      return asia(value, '%d/%m/%Y %H:%M', 'Asia/Ho_Chi_Minh')
    },
  })
  public updatedAt: DateTime;

  @manyToMany(() => User, {
    pivotTable: 'buff_like_employees',
  })
  public Users: ManyToMany<typeof User>

  @manyToMany(() => Service, {
    pivotTable: 'buff_like_services',
  })
  public Services: ManyToMany<typeof Service>
}
