const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors")
const mongoose = require("mongoose");
const session = require('express-session');
const jwt = require("jsonwebtoken");
const passport = require('./passportConfig.js'); 
// const GoogleStrategy = passport-google-oauth20


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
const adminRoute = require("./routes/Admin");

app.use(express.json())

app.use(cors())
 
app.get('/', (req,res)=>{
  res.send('hola mundo')
})

//rutas google auth
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })

);

//rutas google auth
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token:token
    })
    // Redirige al frontend con el token
    // res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    res.redirect(`${process.env.FRONTEND_URL}/`);
    
  }
);


//database seeder routes
app.use("/api/seed", databaseSeeder);

//routes for users
app.use("/api/users", userRoute);

//routes for products
app.use("/api/products", productRoute);

//routes for orders
app.use("/api/orders", orderRoute);

//routes for orders
app.use("/api/admin", adminRoute);

// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


app.use((req, res, next) => {
  res.status(404).json({"message": "pagina no encontrada"});
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
