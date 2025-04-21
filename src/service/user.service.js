const userModel = require("../models/users.model");
const getUsers = async () => {
  console.log("ENTROU NO GETUSERS DO USERSERVICE...");
  let users = await userModel.find();
  users = users.map((user) => user.toJSON());
  console.log(users);
  return users;
};
module.exports = { getUsers };
