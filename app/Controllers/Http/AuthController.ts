// import User from 'App/Models/User'
// import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async showLogin({ view }: HttpContextContract) {
    return view.render("auth/login");
  }
  public async login ({ auth, request, response }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')
    const rememberUser = !!request.input('remember_me')
    await auth.attempt(username, password, rememberUser)

    return response.redirect().toRoute("admin.dashboard");
  }

  public async logout({view,auth}:HttpContextContract){
    await auth.logout();
    return view.render("auth/login");
  }
}
