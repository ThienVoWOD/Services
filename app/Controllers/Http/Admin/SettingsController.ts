import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import CustomerType from "App/Models/CustomerType";


export default class SettingsController {
  public async index({ view }: HttpContextContract) {
    const state = {
      customerType: await CustomerType.all(),
    };

    return view.render("admin/pages/setting", state);
  }
  public async update_buff_like_price({
    response,
    session,
    request,
  }: HttpContextContract) {
    const payload = request.only(["price"]);
    payload.price = parseInt(payload.price.split(".").join(""), 10);
    const service = await Service.find(2);
    service?.merge(payload);
    service?.save();

    session.flash("success", "Đã thay đổi giá của dịch vụ tăng like");

    return response.redirect().toRoute("admin.setting");
  }

  public async customer_type_update({
    response,
    session,
    request,
    params,
  }: HttpContextContract) {
    const payload = request.only([
      "name",
      "buff_like_price",
      "change_name_price",
    ]);
    payload.buff_like_price = parseInt(
      payload.buff_like_price.split(".").join(""),
      10
    );
    payload.change_name_price = parseInt(
      payload.change_name_price.split(".").join(""),
      10
    );

    const customerType = await CustomerType.find(params.id);
    customerType?.merge(payload);
    customerType?.save();

    session.flash("success", "Đã thay đổi loại khách hàng");

    return response.redirect().toRoute("admin.setting");
  }
  public async customer_type_create({
    session,
    request,
    response,
  }: HttpContextContract) {
    const payload = request.only([
      "name",
      "buff_like_price",
      "change_name_price",
    ]);

    const check = await CustomerType.query().where("name", payload.name);
    if (check.length > 0) {
      session.flash("error", "Loại khách hàng này đã tồn tại!");
      session.flash("customerType", payload);
      return response.redirect().back();
    }

    payload.buff_like_price = parseInt(
      payload.buff_like_price.split(".").join(""),
      10
    );
    payload.change_name_price = parseInt(
      payload.change_name_price.split(".").join(""),
      10
    );
    const customerType = new CustomerType();
    customerType.merge(payload);
    await customerType.save();

    session.flash("success", "Thêm thành công");
    return response.redirect().toRoute("admin.setting");
  }
}
