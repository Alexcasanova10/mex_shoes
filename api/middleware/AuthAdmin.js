// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../models/User");

// const protectAdmin = asyncHandleR(async(req,res,next)=>{

//     //aqui hacer un middelware que verifica si el user isAdmin =true entonces nos manda ala vista de admin de dasjboard 
//     await User.findOne('email');



// })

// module.exports=protectAdmin

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } 
  // Prioridad 2: Token de la sesión de Google
  else if (req.session.token) {
    token = req.session.token;
  }


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (req.user.isAdmin) {
        return next();
      } else {
        res.status(403).json({ message: "Acceso denegado" });
      }
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = adminProtect;
