import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view }: HttpContextContract){
    const state = {
      User: await User.all()
    };

    return view.render("admin.pages.user.index", state);
    // return state
  }

  public async create({ view }: HttpContextContract) {
    return view.render("admin.pages.user.create");
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = request.only(["name", "username", "password", "role", "link_fb"]);

    const check = await User.query().where("username", payload.username);

    if(check.length > 0){
      session.flash('error', 'Tài khoản này đã tồn tại');
      session.flash('user', payload);
      return response.redirect().back();
    }

    const user = new User();
    user.merge(payload);
    await user.save();
    session.flash('success', 'Thêm thành công');
    return response.redirect().toRoute("admin.user.index");
  }

  public async edit({ view, params }: HttpContextContract) {
    const user = await User.find(params.id);

      await user?.preload("sellPage");
      await user?.preload("buffLike");
      await user?.preload("changeName");

      const state = {
        User: user?.toJSON(),
      };
    return view.render("admin.pages.user.edit", state);
    // return state
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    const password = request.only(["password"]);
    if(password.password === ""){
      const payload = request.only(["name", "link_fb", "role", "username"]);
      const user = await User.find(params.id);
      user?.merge(payload);
      await user?.save();
    }else{
      const payload = request.only(["name", "link_fb", "role", "username", "password"]);
      const user = await User.find(params.id);
      user?.merge(payload);
      await user?.save();
    }

    session.flash('success', 'Sửa thành công.');

    return response.redirect().toRoute("admin.user.index");
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.find(params.id);
    await user?.delete();
    return true;
  }
}

