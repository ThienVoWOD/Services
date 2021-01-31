import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "DashboardController.index").as("dashboard");

  Route.resource("sellPage", "SellPagesController");
  Route.post("/sellPage/update/:id", 'SellPagesController.update').as("sellPage.update")
  Route.post("/sellPage/delete/:id", 'SellPagesController.destroy').as("sellPage.delete")
  Route.post("/sellPage/update/status/:id", 'SellPagesController.status').as("sellPage.update.status")

  Route.resource("changeName", "ChangeNameController");
  Route.post("/changeName/update/:id", 'ChangeNameController.update').as("changeName.update")
  Route.post("/changeName/delete/:id", 'ChangeNameController.destroy').as("changeName.delete")
  Route.post("/changeName/update/status/:id", 'ChangeNameController.status').as("changeName.update.status")

  Route.resource("buffLike", "BuffLikesController");
  Route.post("/buffLike/update/:id", 'BuffLikesController.update').as("buffLike.update")
  Route.post("/buffLike/delete/:id", 'BuffLikesController.destroy').as("buffLike.delete")
  Route.post("/buffLike/update/status/:id", 'BuffLikesController.status').as("buffLike.update.status")

  Route.resource("user", "UsersController");
  Route.post("/user/update/:id", 'UsersController.update').as("update")
  Route.post("/user/delete/:id", 'UsersController.destroy').as("delete")

  Route.get("/setting", "SettingsController.index").as("setting");

  Route.post(
    "/user/Service/update",
    "SettingsController.update_buff_like_price"
  ).as("service.price.update");
  Route.post(
    "/setting/customerType/update/:id",
    "SettingsController.customer_type_update"
  ).as("setting.customerType.update");
  Route.post(
    "/setting/customerType/create",
    "SettingsController.customer_type_create"
  ).as("setting.customerType.create");

})
  .namespace("App/Controllers/Http/Admin")
  .prefix("/admin")
  .middleware(["auth"])
  .as("admin");
