const products =  [
  {
    name: "Adidas Samba Classic",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1bfdfd053405a6f75_9366/Samba_Shoes_Green_IG1243_01_standard.jpg",
    description:
      "Clásicos Adidas Samba en verde, ideales para el estilo casual y deportes. Su diseño y comodidad los hacen únicos.",
    price: 120,
    countInStock: 10,
    rating: 4.8,
    numReview: 15,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true

  },
  {
    name: "Adidas Forum Low",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ee357a7a8aef48d9b295af9e00205eec_9366/Forum_Low_Shoes_White_IE7165_01_standard.jpg",
    description:
      "Zapatillas Forum Low en blanco, cómodas y con un estilo moderno para cualquier ocasión.",
    price: 105,
    countInStock: 5,
    rating: 4.5,
    numReview: 22,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Adidas Stan Smith",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a655b830a086442aa041af9c009fcdfc_9366/Stan_Smith_Shoes_White_FZ6429_01_standard.jpg",
    description:
      "Los icónicos Stan Smith en blanco, ideales para looks casuales y deportivos.",
    price: 100,
    countInStock: 7,
    rating: 4.7,
    numReview: 18,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Adidas Stan Smith Crepe",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/584dcc48a1734ca4baf314572273e64e_9366/Stan_Smith_Crepe_Shoes_White_IG5531_01_standard.jpg",
    description:
      "Stan Smith con suela crepe para un estilo sofisticado y único en blanco.",
    price: 130,
    countInStock: 3,
    rating: 4.6,
    numReview: 10,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Adidas Superstar ADV",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b7e1026dbe8248fbbc31ae02002e1a62_9366/Superstar_ADV_Shoes_White_GW6930_01_standard.jpg",
    description:
      "Superstar ADV en blanco, diseño clásico y atemporal, perfecto para el día a día.",
    price: 115,
    countInStock: 6,
    rating: 4.9,
    numReview: 30,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Adidas Forum 84 Low ADV",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aebc2dba24cd456a9baaafad0019bac3_9366/Forum_84_Low_ADV_Shoes_Black_IG7581_01_standard.jpg",
    description:
      "Forum 84 Low en negro, un estilo retro con detalles modernos y gran comodidad.",
    price: 110,
    countInStock: 8,
    rating: 4.4,
    numReview: 12,
    brand: "Adidas",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Nike Air Max 90",
    image:
      "https://static.nike.com/a/images/t_default/78bbcc91-7c6f-4e31-9b6b-9cb3e39440c8/air-max-90-shoe-bLc1BR.png",
    description:
      "Los Nike Air Max 90 ofrecen una comodidad superior y un estilo retro-moderno, perfecto para un look casual.",
    price: 140,
    countInStock: 8,
    rating: 4.7,
    numReview: 25,
    brand: "Nike",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Puma RS-X³ Puzzle",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/371570/01/sv01/fnd/EEA/fmt/png",
    description:
      "Las Puma RS-X³ Puzzle combinan color y comodidad, perfectas para quienes buscan un estilo llamativo y urbano.",
    price: 110,
    countInStock: 12,
    rating: 4.6,
    numReview: 18,
    brand: "Puma",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Vans Old Skool",
    image:
      "https://images.vans.com/is/image/Vans/DSV6QU-HERO?$PDP-FULL-IMAGE$",
    description:
      "Las clásicas Vans Old Skool en blanco y negro, perfectas para un look relajado y urbano.",
    price: 65,
    countInStock: 20,
    rating: 4.5,
    numReview: 34,
    brand: "Vans",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "Reebok Club C 85",
    image:
      "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/8b4c853740dd4a7eb364a9f101261776_9366/Club_C_85_Shoes_White_GW5015_01_standard.jpg",
    description:
      "Un diseño clásico de Reebok con el Club C 85, perfectas para el día a día y con una gran durabilidad.",
    price: 75,
    countInStock: 15,
    rating: 4.3,
    numReview: 12,
    brand: "Reebok",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },
  {
    name: "New Balance 574",
    image:
      "https://nb.scene7.com/is/image/NB/m574egr_nb_02_i?$pdpflexf2$&wid=880&hei=880",
    description:
      "El modelo New Balance 574 ofrece un look retro-moderno y gran comodidad para el uso diario.",
    price: 90,
    countInStock: 6,
    rating: 4.6,
    numReview: 19,
    brand: "Otras",
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5],
    status_Active: true
  },


]

module.exports = products;

  // { ejemplo de objeto con 3 imafenes, así haremos la insercion de los demas datos
  //   "name": "Adidas Samba Classic",
  //   "images": [
  //     "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1bfdfd053405a6f75_9366/Samba_Shoes_Green_IG1243_01_standard.jpg",
  //     "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1b9c6d053405a6f75_9366/Samba_Shoes_Green_IG1243_02_standard.jpg",
  //     "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1a8a6d053405a6f75_9366/Samba_Shoes_Green_IG1243_03_standard.jpg"
  //   ],
  //   "description": "Clásicos Adidas Samba en verde, ideales para el estilo casual y deportes. Su diseño y comodidad los hacen únicos.",
  //   "price": 120,
  //   "countInStock": 10,
  //   "rating": 4.8,
  //   "numReview": 15
  // }