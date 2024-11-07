const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin",
    email: "admin@node.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "User",
    email: "user@node.com",
    password: bcrypt.hashSync("123456", 10),
  },
  
  {
    name: "Clinete",
    email: "cliente@gmail.com",
    password: "clientazochido",
  },
  
  // { ejemplo de last name en user 
  //   name: "User",
  //   last_name: "last name owo",
  //   email: "user@node.com",
  //   password: bcrypt.hashSync("123456", 10),
  // },


];

module.exports = users;
