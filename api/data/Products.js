const Product = require('../models/Product');

// const products = new Product

// ({
//   name: "Zapatillas Deportivas",
//   image: "https://example.com/zapatillas.jpg",
//   brand: "Nike",
//   description: "Zapatillas deportivas de alta calidad.",
//   price: 1200,
//   sizes: [
//     { size: 24, quantity: 10 },
//     { size: 24.5, quantity: 5 },
//     { size: 25, quantity: 8 },
//     { size: 26, quantity: 3 },
//     { size: 27, quantity: 7 },
//     { size: 28, quantity: 2 }
//   ]
// });

// {
//   name: "New Balance 574",
//   image:
//     "https://nb.scene7.com/is/image/NB/m574egr_nb_02_i?$pdpflexf2$&wid=880&hei=880",
//   description:
//     "El modelo New Balance 574 ofrece un look retro-moderno y gran comodidad para el uso diario.",
//   price: 90,
//   countInStock: 6,
//   rating: 4.6,
//   numReview: 19,
//   brand: "Otras",
//   sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
//   status_Active: true
// },

const products =  [
  {
    "name": "Nike Air Max 270",
    "image": "https://www.laces.mx/cdn/shop/products/AH6789-001_1.jpg?v=1650985884",
    "brand": "Nike",
    "description": "Comodidad excepcional con amortiguación Air Max.",
    "price": 140,
    "sizes": [
      { "size": 24, "quantity": 5 },
      { "size": 25, "quantity": 7 },
      { "size": 26, "quantity": 8 },
      { "size": 27, "quantity": 6 },
      { "size": 28, "quantity": 9 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Nike Revolution 6",
    "image": "https://ss203.liverpool.com.mx/lg/1111446330.jpg",
    "brand": "Nike",
    "description": "Zapatillas versátiles para correr y uso diario.",
    "price": 90,
    "sizes": [
      { "size": 24, "quantity": 4 },
      { "size": 24.5, "quantity": 6 },
      { "size": 25, "quantity": 7 },
      { "size": 26.5, "quantity": 8 },
      { "size": 27.5, "quantity": 5 }
    ],
    "countInStock": 30,
    "status_Active": true
  },
  {
    "name": "Adidas Ultraboost 22",
    "image": "https://www.innovasport.com/medias/IS-GY9353-3.jpg?context=bWFzdGVyfGltYWdlc3w5MTM0OXxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJneFppOW9ZMlF2TVRFMk1URTVNek16TkRNM056UXVhbkJufDQwMjc5NmM0Mjc4YzQ5MmFkOTdiMTY5NWEzNjg4YjM2M2FhZGIxY2QwY2MyODc4NWM2NTU5NDQ2OGRhYjU5ZTc",
    "brand": "Adidas",
    "description": "Zapatillas de alto rendimiento con ajuste perfecto.",
    "price": 150,
    "sizes": [
      { "size": 24, "quantity": 6 },
      { "size": 25.5, "quantity": 5 },
      { "size": 26, "quantity": 7 },
      { "size": 27, "quantity": 8 },
      { "size": 28.5, "quantity": 9 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Puma RS-X",
    "image": "https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1030302-0202V1.jpg",
    "brand": "Puma",
    "description": "Zapatillas retro inspiradas en los años 80.",
    "price": 125,
    "sizes": [
      { "size": 24.5, "quantity": 8 },
      { "size": 25, "quantity": 7 },
      { "size": 25.5, "quantity": 6 },
      { "size": 26.5, "quantity": 5 },
      { "size": 27, "quantity": 9 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Reebok Club C 85",
    "image": "https://files.plytix.com/api/v1.1/rn/public_files/pim/assets/bf/71/18/63/631871bfb0bc3d00016e8ea0/images/a2/8e/04/66/66048ea24894f02493abea3d/100025379_01.tif/100025379_01.jpg?s=600x&t=JPEG",
    "brand": "Reebok",
    "description": "Diseño clásico y elegante para uso casual.",
    "price": 100,
    "sizes": [
      { "size": 24, "quantity": 6 },
      { "size": 24.5, "quantity": 5 },
      { "size": 25.5, "quantity": 8 },
      { "size": 27, "quantity": 9 },
      { "size": 29, "quantity": 7 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Charly Maximus",
    "image": "https://b2cimpulsmx.vtexassets.com/arquivos/ids/182862-800-800?v=638494522968870000&width=800&height=800&aspect=true",
    "brand": "Charly",
    "description": "Confort y diseño innovador para tu día a día.",
    "price": 85,
    "sizes": [
      { "size": 24, "quantity": 6 },
      { "size": 25, "quantity": 8 },
      { "size": 26, "quantity": 5 },
      { "size": 27, "quantity": 7 },
      { "size": 28.5, "quantity": 9 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Vans Old Skool",
    "image": "https://chilangoskate.com/tienda/8423-large_default/tenis-vans-old-skool-black-and-white.jpg",
    "brand": "Vans",
    "description": "Zapatillas icónicas con diseño de lona y gamuza.",
    "price": 100,
    "sizes": [
      { "size": 24, "quantity": 5 },
      { "size": 25, "quantity": 7 },
      { "size": 25.5, "quantity": 8 },
      { "size": 26.5, "quantity": 9 },
      { "size": 27, "quantity": 6 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Panam Clásico 084",
    "image": "https://panam.com.mx/cdn/shop/files/010800-1131-2_540x.jpg?v=1724277274",
    "brand": "Panam",
    "description": "Zapatillas mexicanas con un diseño retro.",
    "price": 80,
    "sizes": [
      { "size": 24, "quantity": 6 },
      { "size": 25, "quantity": 8 },
      { "size": 26, "quantity": 7 },
      { "size": 27, "quantity": 5 },
      { "size": 28.5, "quantity": 9 }
    ],
    "countInStock": 35,
    "status_Active": true
  },
  {
    "name": "Puma RS-X³ Puzzle",
    "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/371570/01/sv01/fnd/EEA/fmt/png",
    "brand": "Puma",
    "description": "La mejor calidad que nos ofrece Puma.",
    "price": 90,
    "sizes": [
      { "size": 24, "quantity": 8 },
      { "size": 25.5, "quantity": 6 },
      { "size": 27, "quantity": 5 },
      { "size": 28.5, "quantity": 9 },
      { "size": 29.5, "quantity": 7 }
    ],
    "countInStock": 35,
    "status_Active": true
  }
]
  

module.exports = products;




// {
//   name: "Zapatillas Deportivas",
//   image: "https://example.com/zapatillas.jpg",
//   brand: "Nike",
//   description: "Zapatillas deportivas de alta calidad.",
//   price: 1200,
//   sizes: [
//     { size: 24, quantity: 10 },
//     { size: 24.5, quantity: 5 },
//     { size: 25, quantity: 8 },
//     { size: 26, quantity: 3 },
//     { size: 27, quantity: 7 },
//     { size: 28, quantity: 2 }
//   ],
//   countInStock: 35,
//   status_Active: true

// }