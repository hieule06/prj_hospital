import userSevices from "../services/userServices";

const handleUserLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
      });
    } else {
      const user = await userSevices.validateLogin(email, password);
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!",
        users: [],
      });
    }

    let users = await userSevices.getAllUsers(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "ok!",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleCreateNewUser = async (req, res) => {
  try {
    const dataUser = req.body;
    const checkEmail = await userSevices.checkEmail(dataUser.email);
    if (!checkEmail) {
      const newUser = await userSevices.createNewUser(dataUser);
      return res.status(200).json({ newUser });
    } else {
      return res
        .status(200)
        .json({ errCode: 1, errMessage: "Email already exists !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const idUser = req.query.id;
    const AllUsers = await userSevices.deleteUser(idUser);
    if (AllUsers) {
      return res.status(200).json({ AllUsers });
    } else {
      return res.send("idUser is not exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const userEdit = await userSevices.updateUser(req.body);
    return res.status(200).json({ userEdit });
  } catch (error) {
    console.log(error);
  }
};

const handlePatientLogin = async (req, res) => {
  try {
    const idPatient = req.query.idPatient;
    const result = await userSevices.checkPatientMainLogin(idPatient);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
};

const handleGetRegulation = async (req, res) => {
  try {
    const dataRegulation = await userSevices.getRegulation(req.query.type);
    return res.status(200).json({ dataRegulation });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleUserLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handlePatientLogin,
  handleGetRegulation,
};
