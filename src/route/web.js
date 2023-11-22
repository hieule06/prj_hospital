import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/login", homeController.getLoginPage);
  router.post("/submit-login", homeController.getSubmitLoginPage);
  router.get("/user-page", homeController.getUserPage);
  router.get("/edit-user", homeController.editUser);
  router.post("/put-edit-user", homeController.updateUser);
  router.get("/delete-user", homeController.deleteUser);

  router.post("/api/login", userController.handleUserLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/put-edit-user", userController.handleUpdateUser);
  router.get("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
