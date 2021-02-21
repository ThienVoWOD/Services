
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
export default class AuthController {
  public async showLogin({ view }: HttpContextContract) {
    return view.render("auth/login");
  }
  public async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const username = request.input("username");
    const password = request.input("password");
    const rememberUser = !!request.input("remember_me");
    const user = await User.query().where("username", username);
    if (user[0].role === "user") {
      session.flash("error", "Bạn không đủ quyền để đăng nhập");
      return response.redirect().back();
    }
    await auth.attempt(username, password, rememberUser);

    return response.redirect().toRoute("admin.dashboard");
  }

  public async logout({ view, auth }: HttpContextContract) {
    await auth.logout();
    return view.render("auth/login");
  }
}
