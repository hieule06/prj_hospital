import db from "../models";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getLoginPage = async (req, res) => {
  try {
    return res.render("loginpage.ejs");
  } catch (error) {
    console.log(error);
  }
};

let getSubmitLoginPage = async (req, res) => {
  try {
    await CRUDService.createNewUser(req.body);
    return res.render("loginpage.ejs");
  } catch (error) {
    console.log(error);
  }
};

const getUserPage = async (req, res) => {
  try {
    const dataUsers = await CRUDService.getAllUsers();
    return res.render("user-page.ejs", { dataUsers: dataUsers });
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const dataUser = await CRUDService.getUserEdit(req.query.id);
    return res.render("edit-user.ejs", { dataUser: dataUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const AllUsers = await CRUDService.updateUser(req.body);
    return res.render("user-page.ejs", { dataUsers: AllUsers });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const idUser = req.query.id;
    const AllUsers = await CRUDService.deleteUser(idUser);
    if (AllUsers) {
      return res.render("user-page.ejs", { dataUsers: AllUsers });
    } else {
      return res.send("idUser is not exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomePage,
  getLoginPage,
  getSubmitLoginPage,
  getUserPage,
  editUser,
  updateUser,
  deleteUser,
};
