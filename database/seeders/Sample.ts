import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Service from "App/Models/Service";
import User from "App/Models/User";
import SellPage from "App/Models/SellPage";
import ChangeName from "App/Models/ChangeName";
import BuffLike from "App/Models/BuffLike";

export default class Sample extends BaseSeeder {
  public async run () {
    const user = await User.createMany([
      {
        id: 1,
        name: "Admin",
        username: "admin",
        password: 'admin',
        link_fb: 'https://www.facebook.com/profile.php?id=100013047738517',
        role: "admin",
      },
      {
        id: 2,
        name: "Võ Tá Thiện",
        username: "ThienVo",
        password:'thien',
        link_fb: 'https://www.facebook.com/profile.php?id=100013047738517',
        role: "admin",
      },
    ])
    const service = await Service.createMany([
      {
        id: 1,
        name: "Dịch vụ bán page",
        price: 10000,
      },
      {
        id: 2,
        name: "Dịch vụ tăng like",
        price: 500,
      },
      {
        id: 3,
        name: "Dịch vụ đổi tên",
        price: 10000,
      },
    ])

    await SellPage.createMany([
      {
        id: 1,
        note: "https://www.facebook.com/",
        status: "Chưa xử lý",
        name: "demo"
      },
      {
        id: 2,
        note: "https://www.facebook.com/",
        status: "Đang xử lý",
        name: "demo"
      },
      {
        id: 3,
        note: "https://www.facebook.com/",
        status: "Chưa xử lý",
        name: "demo"
      },
      {
        id: 4,
        note: "https://www.facebook.com/",
        status: "Chưa thanh toán",
        name: "demo"
      },
      {
        id: 5,
        note: "https://www.facebook.com/",
        status: "Đang xử lý",
        name: "demo"
      },
      {
        id: 6,
        note: "https://www.facebook.com/",
        status: "Đã thanh toán",
        name: "demo"
      },
      {
        id: 7,
        note: "https://www.facebook.com/",
        status: "Đang xử lý",
        name: "demo"
      },
      {
        id: 8,
        note: "https://www.facebook.com/",
        status: "Đã thanh toán",
        name: "demo"
      },
      {
        id: 9,
        note: "https://www.facebook.com/",
        status: "Đang xử lý",
        name: "demo"
      },
      {
        id: 10,
        note: "https://www.facebook.com/",
        status: "Chưa thanh toán",
        name: "demo"
      },
      {
        id: 11,
        note: "https://www.facebook.com/",
        status: "Đã thanh toán",
        name: "demo"
      },
      {
        id: 12,
        note: "https://www.facebook.com/",
        status: "Chưa thanh toán",
        name: "demo"
      },

    ]);

    await user[0].related("sellPage").sync([1,2,3,4,5,6]);
    await user[1].related("sellPage").sync([7,8,9,10,11,12]);

    await service[0].related("sellPage").sync([1,2,3,4,5,6,7,8,9,10,11,12]);

    await ChangeName.createMany([
      {
        id: 1,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 2,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 3,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 4,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 5,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 6,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 7,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 8,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 9,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 10,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 11,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 12,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 13,
        name: "Test page",
        new_name: "demo page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
    ])

    await user[0].related("changeName").sync([1,8,3,7,5,12,13]);
    await user[1].related("changeName").sync([2,4,9,10,11,6,7]);

    await service[2].related("changeName").sync([1,2,3,4,5,6,7,8,9,10,11,12,13]);

    await BuffLike.createMany([
      {
        id: 1,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 2,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 3,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 4,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 5,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 6,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 7,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 8,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 9,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 10,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 11,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 12,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
      {
        id: 13,
        name: "Test page",
        link_page: "https://www.facebook.com/",
        price: 20000,
        status: "Đang xử lý",
        note: 'u think u can kill me'
      },
    ])

    await user[0].related("buffLike").sync([1,8,3,7,5,12,13]);
    await user[1].related("buffLike").sync([2,4,9,10,11,6,7]);

    await service[1].related("buffLike").sync([1,2,3,4,5,6,7,8,9,10,11,12,13]);
  }
}
