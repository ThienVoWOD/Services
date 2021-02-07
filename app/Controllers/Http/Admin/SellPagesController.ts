import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import sellPage from "App/Models/SellPage";
import User from "App/Models/User";
import _ from "lodash";

export default class SellPagesController {
  public async index({ view, request }: HttpContextContract) {
    const status = request.input("status", "");
    const state = {
      sellPage: await sellPage
        .query()
        .where((builder) => {
          if (status) {
            builder.orWhere("status", "like", status);
          }
        })
        .preload("Users"),
      User: await User.query(),
    };

    return view.render("admin.pages.sellPage.index", state);
  }

  public async create({ view }: HttpContextContract) {
    const users = await User.query().preload("customerType");
    const state = {
      User: users,
      price: users[0].customerType[0].sell_page_price,
    };
    return view.render("admin.pages.sellPage.create", state);
    // return {user: state.User};
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only(["name", "number_of_like", "price", "note"]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);
    payload.number_of_like = parseInt(
      payload.number_of_like.split(".").join(""),
      10
    );

    const sell = new sellPage();
    sell.merge(payload);
    sell.status = "Chưa xử lý";

    await sell.save();
    await sell.related("Users").sync([user.user_id]);
    await sell.related("Services").sync([1]);

    session.flash("success", "Thêm thành công");

    return response.redirect().toRoute("admin.sell_page.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const sell = await sellPage.find(params.id);

    await sell?.preload("Users");

    const state = {
      sellPage: sell?.toJSON(),
      users: await User.query().preload("customerType"),
    };
    return view.render("admin.pages.sellPage.edit", state);
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const payload = request.only([
      "name",
      "number_of_like",
      "price",
      "status",
      "note",
    ]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);
    payload.number_of_like = parseInt(
      payload.number_of_like.split(".").join(""),
      10
    );

    const sell = await sellPage.find(params.id);
    sell?.merge(payload);

    await sell?.save();
    await sell?.related("Users").sync([user.user_id]);

    session.flash("success", "Sửa thành công.");

    return response.redirect().toRoute("admin.sell_page.index");
  }

  public async destroy({ params }: HttpContextContract) {
    const sell = await sellPage.find(params.id);
    await sell?.delete();
    return true;
  }

  public async status({ request, response, params }: HttpContextContract) {
    const payload = request.only(["status"]);

    const sell = await sellPage.find(params.id);
    sell?.merge(payload);

    await sell?.save();

    const state = {
      sellPage: await sellPage.query().preload("Users"),
    };

    return response.redirect().toRoute("admin.sell_page.index", state);
  }
}
