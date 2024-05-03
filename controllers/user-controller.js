const { UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length === 0)
    return res.status(404).json({
      success: false,
      message: "No user found!",
    });
  return res.status(201).json({
    success: true,
    data: users,
  });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  //const user = users.find((each) => each.id === id );

  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.deleteOne({
    _id: id,
  });

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User with given id does not exist",
    });

  // const index = users.indexOf(user);
  // users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "user got deleted successfully!!",
  });
};

exports.UpdateUserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // const user = users.find((each)=> each.id === id);

  const UpdateUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    data: UpdateData,
  });
};

exports.CreateNewUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    subscriptiontype,
    issuedbook,
    subscriptiondate,
  } = req.body;
  // const user = users.find((each) => each.id === id);

  const newUser = await UserModel.create({
    name,
    surname,
    email,
    subscriptiontype,
    issuedbook,
    subscriptiondate,
  });



  return res.status(201).json({
    success: true,
    data: newUser,
  });
};
