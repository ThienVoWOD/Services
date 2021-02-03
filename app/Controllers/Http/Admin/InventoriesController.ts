import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Store from "App/Models/Store";
import moment from "moment";
import Inventory from "App/Models/Inventory";

export default class InventoriesController {
  public async index({ view, request }: HttpContextContract) {
    const date = request.input("date", "");

    const start = date
      ? date.slice(0, date.indexOf(" - "))
      : moment().subtract(30, "days").format("YYYY-MM-DD");

    const end = date
      ? date.slice(date.indexOf(" - ") + 3, date.length)
      : moment().format("YYYY-MM-DD");

    const inventory_total = await Inventory.query()
      .sum("price as total_price")
      .count("id as total_count")
      .whereBetween("created_at", [start, end + " 23:59:59"]);
    const state = {
      inventories: await Inventory.query().preload("store"),
      inventory_total,
      start,
      end,
      stores: await Store.all(),
    };

    return view.render("admin.pages.inventory.index", state);
  }

  public async destroy({ params }: HttpContextContract) {
    const inventory = await Inventory.find(params.id);
    await inventory?.delete();
    return true;
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only(["name", "price", "note"]);
    const store = request.only(["store_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);

    const inventory = new Inventory();
    inventory.merge(payload);

    await inventory.save();
    await inventory.related("store").sync([store.store_id]);

    session.flash("success", "Thêm thành công");

    return response.redirect().toRoute("admin.inventories.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const inventory = await Inventory.find(params.id);

    await inventory?.preload("store");

    const state = {
      inventory: inventory?.toJSON(),
      stores: await Store.query().preload("inventory"),
    };
    return view.render("admin.pages.inventory.edit", state);
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const payload = request.only(["name", "price", "note"]);
    const store = request.only(["store_id"]);

    payload.price = parseInt(payload.price.split(".").join(""), 10);

    const inventory = await Inventory.find(params.id);
    inventory?.merge(payload);

    await inventory?.save();
    await inventory?.related("store").sync([store.store_id]);

    session.flash("success", "Sửa thành công.");

    return response.redirect().toRoute("admin.inventories.index");
  }
}
