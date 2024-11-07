const mongoose = require("mongoose");
 
const enumSizes = [24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5];
const enumBrand = ["Adidas","Nike","Puma","Reebok","Charly","Vans","Panam","Otras"];

const prodcutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  image: { type: String, required: true },

  // image: {
  //   imagen1: { type: String },
  //   imagen2: { type: String },
  //   imagen3: { type: String }
  // },

  sizes: {
    type: [Number],
    enum: enumSizes,
  },

  brand: { 
    type: String, 
    enum: enumBrand
  },


  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReview: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },

  // reviews: [reviewSchema],
});

module.exports = mongoose.model("Product", prodcutSchema)