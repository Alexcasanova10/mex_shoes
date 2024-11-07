const express = require("express");
const app = express();
const dotenv = require("dotenv");
const products = require("./data/Products");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors")
const mongoose = require("mongoose");
const session = require('express-session');



//conectr db de mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Base de datos conectada exitosamente"))
  .then((err) => {
    err;
  });


app.use(session({
  secret: 'secretonode', 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));



const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use(express.json())

app.use(cors())
 
app.get('/', (req,res)=>{
  res.send('hola mundo')
})
//database seeder routes
app.use("/api/seed", databaseSeeder);

//routes for users
app.use("/api/users", userRoute);

//routes for products
app.use("/api/products", productRoute);

//routes for orders
app.use("/api/orders", orderRoute);

// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});
















//api product test route
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((product)=>product.id === req.params.id)
//     res.json(product);
//   });
