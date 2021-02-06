import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import moment from "moment";
import SellPage from "App/Models/SellPage";
import ChangeName from "App/Models/ChangeName";
import BuffLike from "App/Models/BuffLike";
import User from "App/Models/User";


export default class DashboardController {
  public async index({ view, request }: HttpContextContract) {
    const date = request.input("date", "");

    const start = date
      ? date.slice(0, date.indexOf(" - "))
      : moment().subtract(30, "days").format("YYYY-MM-DD");

    const end = date
      ? date.slice(date.indexOf(" - ") + 3, date.length)
      : moment().format("YYYY-MM-DD");

    const changeName_total = await ChangeName.query()
      .sum("price as total_price")
      .count("id as total_count")
      .whereBetween("created_at", [start, end + " 23:59:59"]);

    const buffLike_total = await BuffLike.query()
      .sum("price as total_price")
      .count("id as total_count")
      .whereBetween("created_at", [start, end + " 23:59:59"]);

    const sellPage_total = await SellPage.query()
      .sum("price as total_price")
      .count("id as total_count")
      .whereBetween("created_at", [start, end + " 23:59:59"]);

    const user = await User.query()
      .preload("changeName", (builder) => {
        builder.where("status", "Chưa thanh toán");
      })
      .preload("sellPage", (builder) => {
        builder.where("status", "Chưa thanh toán");
      })
      .preload("buffLike", (builder) => {
        builder.where("status", "Chưa thanh toán");
      });

    var users = [{}];
    await user.forEach((u) => {
      if (
        u.sellPage.length > 0 ||
        u.buffLike.length > 0 ||
        u.changeName.length > 0
      ) {
        var price = 0;
        for (let i = 0; i < u.sellPage.length; i++) {
          price += u.sellPage[i].price;
        }
        for (let i = 0; i < u.buffLike.length; i++) {
          price += u.buffLike[i].price;
        }
        for (let i = 0; i < u.changeName.length; i++) {
          price += u.changeName[i].price;
        }
        users.push({
          name: u.name,
          username: u.username,
          price: price,
          link: u.link_fb,
        });
      }
    });

    const state = {
      total: {
        buffLike_total,
        sellPage_total,
        changeName_total,
        total_price:
          changeName_total[0].total_price +
          sellPage_total[0].total_price +
          buffLike_total[0].total_price,
        total_count:
          changeName_total[0].total_count +
          sellPage_total[0].total_count +
          buffLike_total[0].total_count,
      },
      start,
      end,
      total_count: {
        buffLike_total_count: await BuffLike.query().count("id as total"),
        changeName_total_count: await ChangeName.query().count("id as total"),
        sellPage_total_count: await SellPage.query().count("id as total"),
        user_total_count: await User.query().count("id as total"),
      },
      users: users.splice(1, users.length),
    };

    return view.render("admin.pages.dashboard", state);
    // return state;
  }

  public async invoice({ view, params }: HttpContextContract) {
    const state = {
      user: await User.query()
        .where("username", params.username)
        .preload("changeName", (builder) => {
          builder.where("status", "Chưa thanh toán");
          builder.orderBy("created_at", "desc");
        })
        .preload("sellPage", (builder) => {
          builder.where("status", "Chưa thanh toán");
          builder.orderBy("created_at", "desc");
        })
        .preload("buffLike", (builder) => {
          builder.where("status", "Chưa thanh toán");
          builder.orderBy("created_at", "desc");
        }),
      now: moment().format("DD-MM-YYYY"),
    };
    return view.render("admin.pages.invoice", state);
    // return state
  }

  public async checkout({ response, params }: HttpContextContract) {
    const user = await User.query()
      .where("username", params.username)
      .preload("changeName", (builder) => {
        builder.where("status", "Chưa thanh toán");
        builder.orderBy("created_at", "desc");
      })
      .preload("sellPage", (builder) => {
        builder.where("status", "Chưa thanh toán");
        builder.orderBy("created_at", "desc");
      })
      .preload("buffLike", (builder) => {
        builder.where("status", "Chưa thanh toán");
        builder.orderBy("created_at", "desc");
      });

    for (let i = 0; i < user[0].changeName.length; i++) {
      const payload = { status: "Đã Thanh toán" };
      const change = await ChangeName.find(user[0].changeName[i].id);
      change?.merge(payload);
      await change?.save();
    }

    for (let i = 0; i < user[0].buffLike.length; i++) {
      const payload = { status: "Đã Thanh toán" };
      const buff = await BuffLike.find(user[0].buffLike[i].id);
      buff?.merge(payload);
      await buff?.save();
    }

    for (let i = 0; i < user[0].sellPage.length; i++) {
      const payload = { status: "Đã Thanh toán" };
      const sell = await SellPage.find(user[0].sellPage[i].id);
      sell?.merge(payload);
      await sell?.save();
    }

    return true;
  }
}
