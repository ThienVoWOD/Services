import Route from "@ioc:Adonis/Core/Route";



Route.group(() => {
  Route.get("/login", "AuthController.showLogin").as("show.login");
  Route.post("/login", "AuthController.login").as("login");
  Route.get("/logout","AuthController.logout").as("logout").middleware(["auth"])
})
  .namespace("App/Controllers/Http")
  .prefix("/auth")
  .as("auth");

