import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Store from "App/Models/Store";

export default class StoresController {
  public async index({ view }: HttpContextContract) {
    const state = {
      stores: await Store.all(),
    };

    return view.render("admin.pages.store.index", state);
  }

  public async destroy({ params }: HttpContextContract) {
    const store = await Store.find(params.id);
    await store?.delete();
    return true;
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only(["name", "type", "link_fb", "note"]);

    const store = new Store();
    store.merge(payload);

    await store.save();

    session.flash("success", "Thêm thành công");

    return response.redirect().toRoute("admin.store.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const store = await Store.find(params.id);

    const state = {
      store: store?.toJSON(),
    };
    return view.render("admin.pages.store.edit", state);
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const payload = request.only(["name", "type", "note", "link_fb"]);

    const store = await Store.find(params.id);
    store?.merge(payload);

    await store?.save();

    session.flash("success", "Sửa thành công.");

    return response.redirect().toRoute("admin.store.index");
  }
}
