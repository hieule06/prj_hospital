import userSevices from "../services/userSevices";

const handleUserLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
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

module.exports = {
  handleUserLogin,
};
