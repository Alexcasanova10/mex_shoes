const express = require("express");
const bandaRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Banda = require("../models/Banda.js");


bandaRoute.get("/databanda", asyncHandler(async(req,res)=>{
    try{

        const bandaBlueTotal = await Banda.aggregate([
         {
           $match: {
             color: "azul",  
           },
         },
         {
           $count: "totalBlue", 
         },
       ]);
   
       // Si no se encuentra ningún documento, devolver 0
       const totalAzul = bandaBlueTotal.length > 0 ? bandaBlueTotal[0].totalBlue : 0;
 
 
       const bandaRedTotal = await Banda.aggregate([
         {
           $match: {
             color: "rojo",  
           },
         },
         {
           $count: "totalRojo", 
         },
       ]);
   
       // Si no se encuentra ningún documento, devolver 0
       const totalRojo = bandaRedTotal.length > 0 ? bandaRedTotal[0].totalRojo : 0;
 
 
       const bandaGreenTotal = await Banda.aggregate([
         {
           $match: {
             color: "verde",  
           },
         },
         {
           $count: "totalGreen", 
         },
       ]);
   
       // Si no se encuentra ningún documento, devolver 0
       const totalVerde = bandaGreenTotal.length > 0 ? bandaGreenTotal[0].totalGreen : 0;

       res.json({ 
        totalBlue: totalAzul,
        totalRed: totalRojo,
        totalGreen: totalVerde
        
        });


    }catch(error){
        res.status(500).json({ message: error.message });
    }
}))


bandaRoute.get("/total-blue", async (req, res) => {
    try {
      const bandaBlueTotal = await Banda.aggregate([
        {
          $match: {
            color: "azul",  
          },
        },
        {
          $count: "totalBlue", 
        },
      ]);
  
      // Si no se encuentra ningún documento, devolver 0
      const total = bandaBlueTotal.length > 0 ? bandaBlueTotal[0].totalBlue : 0;
  
      res.json({ totalBlue: total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

bandaRoute.get("/total-red", async (req, res) => {
    try {
      const bandaRedTotal = await Banda.aggregate([
        {
          $match: {
            color: "rojo",  
          },
        },
        {
          $count: "totalRojo", 
        },
      ]);
  
      // Si no se encuentra ningún documento, devolver 0
      const total = bandaRedTotal.length > 0 ? bandaRedTotal[0].totalRojo : 0;
  
      res.json({ totalRojo: total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


bandaRoute.get("/total-green", async (req, res) => {
    try {
      const bandaGreenTotal = await Banda.aggregate([
        {
          $match: {
            color: "verde",  
          },
        },
        {
          $count: "totalGreen", 
        },
      ]);
  
      // Si no se encuentra ningún documento, devolver 0
      const total = bandaGreenTotal.length > 0 ? bandaGreenTotal[0].totalGreen : 0;
  
      res.json({ totalGreen: total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = bandaRoute;
