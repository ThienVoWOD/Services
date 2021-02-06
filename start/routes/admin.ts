import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {

  // trang chủ
  Route.get("/", "DashboardController.index").as("dashboard");
  Route.get("/dashboard/invoice/:username", "DashboardController.invoice").as(
    "dashboard.invoice"
  );
  Route.post(
    "/dashboard/checkout/:username",
    "DashboardController.checkout"
  ).as("dashboard.checkout");

  // Bán page
  Route.resource("sellPage", "SellPagesController");
  Route.post("/sellPage/update/:id", 'SellPagesController.update').as("sellPage.update")
  Route.post("/sellPage/delete/:id", 'SellPagesController.destroy').as("sellPage.delete")
  Route.post("/sellPage/update/status/:id", 'SellPagesController.status').as("sellPage.update.status")
  // ĐỔi tên
  Route.resource("changeName", "ChangeNameController");
  Route.post("/changeName/update/:id", 'ChangeNameController.update').as("changeName.update")
  Route.post("/changeName/delete/:id", 'ChangeNameController.destroy').as("changeName.delete")
  Route.post("/changeName/update/status/:id", 'ChangeNameController.status').as("changeName.update.status")
  // Tăng like
  Route.resource("buffLike", "BuffLikesController");
  Route.post("/buffLike/update/:id", 'BuffLikesController.update').as("buffLike.update")
  Route.post("/buffLike/delete/:id", 'BuffLikesController.destroy').as("buffLike.delete")
  Route.post("/buffLike/update/status/:id", 'BuffLikesController.status').as("buffLike.update.status")
  // tài khoản
  Route.resource("user", "UsersController");
  Route.post("/user/update/:id", 'UsersController.update').as("update")
  Route.post("/user/delete/:id", 'UsersController.destroy').as("delete")
  // Cài đặt
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
  // Kho
  Route.resource("inventories", "InventoriesController");
  Route.post("/inventory/delete/:id", "InventoriesController.destroy").as(
    "inventory.delete"
  );
  Route.post("/inventory/update/:id", "InventoriesController.update").as(
    "inventory.update"
  );
  // Nhà cung cấp
  Route.resource("store", "StoresController");
  Route.post("/store/delete/:id", "StoresController.destroy").as(
    "store.delete"
  );
  Route.post("/store/update/:id", "StoresController.update").as("stores.update");

})
  .namespace("App/Controllers/Http/Admin")
  .prefix("/admin")
  .middleware(["auth"])
  .as("admin");
