const express = require("express");
const userRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");


const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcryptjs');


require('dotenv').config();


 //recuperar contraseña
 userRoute.post('/recuperar', AsyncHandler(async(req,res)=>{
  const {email} = req.body;

  const user = await User.findOne({email});

  if(!user){
      res.status(404);
      throw new Error('Usuario no encontrado')
  }

  //generar token
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  //configuracion correo
  const transporter= nodemailer.createTransport({
      service: 'Gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  }) 

   let nombre = user.name;
  const mailOptions = {
      to: user.email,
      from: '2123300393@soy.utj.edu.mx',
      subject: `Hola ${nombre}, tu token de recuperación de contraseña está aquí` ,
      text: `Sigue el enlace para restablecer tu contraseña: 
      http://localhost:9000/reset/${token}   e igualmente, tu token es este: ${token}`
  };

  await transporter.sendMail(mailOptions);
  res.json({ message: 'Correo de recuperación enviado' });
}))

//token recuperacion contraseña
userRoute.post('/reset/:token', AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
      res.status(400);
      throw new Error('Token inválido o expirado');
  }

  // user.password = await bcrypt.hash(password, 10);
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ 
      message: 'Contraseña actualizada'
   });
})); 





//login
userRoute.post("/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {

      req.session.user = {
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        redirectTo: '/api/users/profile'
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

 


//logout
userRoute.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "No se pudo cerrar la sesión" });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logout exitoso" });
  });
});


//register route
userRoute.post("/register",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400);  
      throw new Error("User Already exist");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      //se agfega la sesion
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      


      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,

          token: generateToken(user._id), //se agrega token al register 

          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  })
);

//get auth profile data
userRoute.get("/profile",protect,AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        last_name: user.last_name,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("USER NOT FOUND");
    }
  })
);


//user profile update
userRoute.put("/profile",protect,AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if(req.body.password)
      {
        user.password = req.body.password
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // createdAt: updatedUser.createdAt,
        token:generateToken(updatedUser._id)
      });

    } else {
      res.status(404);
      throw new Error("USER NOT FOUND");
    }
  })
);

module.exports = userRoute;
