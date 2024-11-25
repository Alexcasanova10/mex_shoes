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


//forzar a redirigir de http a  https
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Configurar sesiones anterior
// app.use(session({
//   secret: 'secretonode', 
//   resave: false, 
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true, 
//     secure: false,
//     maxAge: 24 * 60 * 60 * 1000
//   }
// }));


//nuevo configurar sesiones con verdcel
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretonode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


const corsOptions = {
  origin:[
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_ADMIN 
  ], 
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Base de datos conectada exitosamente"))
  .then((err) => {
    err;
  });

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");
const adminRoute = require("./routes/Admin");
const bandaRoute = require("./routes/Banda.js");

app.use(express.json())

 
app.get('/', (req,res)=>{
  res.send('hola mundo')
})

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })

);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token:token
    })  
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

//routes for conveyor belt
app.use("/api/banda", bandaRoute);

// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use((req, res, next) => {
  res.status(404).json({"message": "pagina no encontrada"});
});

app.listen(PORT || 9000, () => {
  console.log(`server en el  puerto ${PORT}`);
});
















//api product test route
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((product)=>product.id === req.params.id)
//     res.json(product);
//   });
