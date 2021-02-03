import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import buffLike from 'App/Models/buffLike';
import User from 'App/Models/User';
import Service from 'App/Models/Service';

export default class BuffLikesController {
  public async index({ view, request }: HttpContextContract) {
    const status = request.input("status", "");
    const state = {
      buffLike: await buffLike
        .query()
        .where((builder) => {
          if (status) {
            builder.orWhere("status", "like", status);
          }
        })
        .preload("Users"),
        service: await Service.find(2),
    };

    return view.render("admin.pages.buffLike.index", state);
    // return state
  }

  public async create({ view }: HttpContextContract) {
    const Services = await Service.find(2);
    const state = {
      User: await User.all(),
      price: Services?.price,
    };
    return view.render("admin.pages.buffLike.create", state);
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only([
      "name",
      "link_page",
      "need_to_increase",
      "price",
      "note",
    ]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);
    payload.need_to_increase = parseInt(
      payload.need_to_increase.split(".").join(""),
      10
    );

    const buff = new buffLike();
    buff.merge(payload);
    buff.status = "Chưa xử lý";

    await buff.save();
    await buff.related("Users").sync([user.user_id]);
    await buff.related("Services").sync([2]);

    session.flash("success", "Thêm thành công");

    return response.redirect().toRoute("admin.buff_like.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const sell = await buffLike.find(params.id);
    const Services = await Service.find(2);
    await sell?.preload("Users");

    const state = {
      buffLike: sell?.toJSON(),
      users: await User.all(),
      price: Services?.price,
    };
    return view.render("admin.pages.buffLike.edit", state);
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const payload = request.only([
      "name",
      "need_to_increase",
      "link_page",
      "price",
      "status",
      "note",
    ]);
    const user = request.only(["user_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);
    payload.need_to_increase = parseInt(
      payload.need_to_increase.split(".").join(""),
      10
    );

    const buff = await buffLike.find(params.id);
    buff?.merge(payload);

    await buff?.save();
    await buff?.related("Users").sync([user.user_id]);

    session.flash("success", "Sửa thành công.");

    return response.redirect().toRoute("admin.buff_like.index");
  }

  public async destroy({ params }: HttpContextContract) {
    const buff = await buffLike.find(params.id);
    await buff?.delete();
    return true;
  }

  public async status({ request, response, params }: HttpContextContract) {
    const payload = request.only(["status"]);

    const buff = await buffLike.find(params.id);
    buff?.merge(payload);

    await buff?.save();

    return response.redirect().toRoute("admin.buff_like.index");
  }
}
