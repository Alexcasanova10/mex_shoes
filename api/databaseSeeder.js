const router = require("express").Router();
const User = require("./models/User");
const Order = require("./models/Order");
const users = require("./data/Users");
const Product = require("./models/Product");
const products = require("./data/Products");
const AsynHandler = require("express-async-handler");

router.post(  
  "/users",
  AsynHandler(async (req, res) => {
    await User.deleteMany({});
    const UserSeeder = await User.insertMany(users);
    res.send({ UserSeeder });
  })
);

router.get(
  "/productos",
  AsynHandler(async (req, res) => {
    const ProductSeeder = await Product.insertMany(products);
    res.send({ ProductSeeder });
  })
);

router.get(
  "/delorders",
  AsynHandler(async (req, res) => {
    await Order.deleteMany({});
    res.send("ordenes elimnadas!!!");
  })
);

module.exports = router;
