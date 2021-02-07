import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import changeName from 'App/Models/ChangeName';
import User from 'App/Models/User';

export default class ChangeNameController {
  public async index({ view, request }: HttpContextContract) {
    const status = request.input("status", "");
    const users = await User.query().preload("customerType");
    const state = {
      changeName: await changeName
        .query()
        .where((builder) => {
          if (status) {
            builder.orWhere("status", "like", status);
          }
        })
        .preload("Users"),
      User: users,
      price: users[0].customerType[0].change_name_price,
    };

    return view.render("admin.pages.changeName.index", state);
  }

  public async create({ view }: HttpContextContract) {
    const users = await User.query().preload("customerType");
    const state = {
      User: users,
      price: users[0].customerType[0].change_name_price,
    };
    return view.render("admin.pages.changeName.create", state);
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only([
      "name",
      "new_name",
      "link_page",
      "price",
      "note",
    ]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);

    const change = new changeName();
    change.merge(payload);
    change.status = "Chưa xử lý";

    await change.save();
    await change.related("Users").sync([user.user_id]);
    await change.related("Services").sync([3]);

    session.flash("success", "Thêm thành công");

    return response.redirect().toRoute("admin.change_name.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const change = await changeName.find(params.id);

    await change?.preload("Users");

    const state = {
      changeName: change?.toJSON(),
      users: await User.query().preload("customerType"),
    };
    return view.render("admin.pages.changeName.edit", state);
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const payload = request.only([
      "name",
      "new_name",
      "link_page",
      "price",
      "status",
      "note",
    ]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);

    const change = await changeName.find(params.id);
    change?.merge(payload);

    await change?.save();
    await change?.related("Users").sync([user.user_id]);

    session.flash("success", "Sửa thành công.");

    return response.redirect().toRoute("admin.change_name.index");
  }

  public async destroy({ params }: HttpContextContract) {
    const change = await changeName.find(params.id);
    await change?.delete();
    return true;
  }

  public async status({ request, response, params }: HttpContextContract) {
    const payload = request.only(["status"]);

    const change = await changeName.find(params.id);
    change?.merge(payload);

    await change?.save();

    return response.redirect().toRoute("admin.change_name.index");
  }
}
