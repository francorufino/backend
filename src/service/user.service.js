const userModel = require("../models/users.model");
const getUsers = async () => {
  let users = await userModel.find();
  users = users.map((user) => user.toJSON());
  return users;
};
module.exports = getUsers;
