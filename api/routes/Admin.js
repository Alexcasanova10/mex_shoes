const express = require("express");
const adminRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const generateToken = require("../tokenGenerate");


const enumSizes = [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5];
const enumBrand = ["Adidas", "Nike", "Puma", "Reebok", "Charly", "Vans", "Panam", "Otras"];


//el middelware admin protect es pa q no pase al dashboard , aplicarlo 

adminRoute.post("/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password)) && user.isAdmin) {
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
        message: "Bienveido administrador"
      });
    } else {
      res.status(401).json({ message: "Correo o contraseña inválidos, o no tiene permisos de administrador" });
      throw new Error("Correo o contraseña inválida");
    }
  })
);

//logout
adminRoute.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "No se pudo cerrar la sesión" });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logout exitoso" });
  });
});


//register route modificarla pa q ponga isAdmin = true
adminRoute.post("/register",
  asyncHandler(async (req, res) => {
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
        isAdmin: true,

      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  })
);


// Crear un nuevo producto, la ruta antigua......
// adminRoute.post(
//   "/product",
//   asyncHandler(async (req, res) => {
//     const { name, image, sizes, brand, description, price, countInStock } = req.body;

//     // Validar campos obligatorios
//     if (!name || !image || !sizes || !brand || !description || !price || !countInStock) {
//       return res.status(400).json({ message: "Todos los campos son requeridos" });
//     }

//     // Validar talla y marca
//     const isValidSize = sizes.every(size => enumSizes.includes(size));
//     const isValidBrand = enumBrand.includes(brand);

//     if (!isValidSize || !isValidBrand) {
//       return res.status(400).json({ message: "Talla o marca no válidas" });
//     }

//     const product = new Product({
//       name,
//       image,
//       sizes,
//       brand,
//       description,
//       price,
//       countInStock,
//     });

//     const createdProduct = await product.save();
//     console.log("producot creado en da")
//     res.status(201).json(createdProduct);
//   })
// );

  adminRoute.post(
    "/product",
    asyncHandler(async (req, res) => {
      const { name, image, sizes, brand, description, price, countInStock } = req.body;

      // Validar campos obligatorios
      if (!name || !image || !sizes || !brand || !description || !price || countInStock === undefined) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
      }

      // Validar la marca
      if (!enumBrand.includes(brand)) {
        return res.status(400).json({ message: "Marca no válida" });
      }

      // Validar el formato de tallas y cantidades
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return res.status(400).json({ message: "Debe proporcionar al menos una talla y su cantidad" });
      }

      const formattedSizes = sizes.map((item) => {
        const { size, quantity } = item;
        // Validar que la talla sea válida y que la cantidad sea un número
        if (!enumSizes.includes(size) || typeof quantity !== 'number' || quantity < 0) {
          throw new Error(`Talla ${size} o cantidad no válidas`);
        }
        return { size, quantity };
      });

      // Crear un nuevo producto con las tallas y cantidades formateadas
      const product = new Product({
        name,
        image,
        sizes: formattedSizes,
        brand,
        description,
        price,
        countInStock
      });

      const createdProduct = await product.save();
      console.log("Producto creado en la base de datos");
      res.status(201).json(createdProduct);
    })
  );




// Obtener todos los productos
adminRoute.get(
  "/product",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

adminRoute.get(
  "/order",
  asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
  })
);

adminRoute.get("/total-sales", async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const total = totalSales[0]?.totalSales || 0;
    res.json({ totalSales: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar producto, la ruta antigua....
// adminRoute.put(
//   "/product/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name, image, sizes, brand, description, price, countInStock } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { name, image, sizes, brand, description, price, countInStock },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.status(200).json(updatedProduct);
//   })
// );

adminRoute.put(
  "/product/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image, sizes, brand, description, price, countInStock } = req.body;

    // Validar que el producto exista
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validar campos obligatorios
    if (!name || !image || !sizes || !brand || !description || !price || countInStock === undefined) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Validar la marca
    if (!enumBrand.includes(brand)) {
      return res.status(400).json({ message: "Marca no válida" });
    }

    // Validar el formato de tallas y cantidades
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: "Debe proporcionar al menos una talla y su cantidad" });
    }

    const formattedSizes = sizes.map((item) => {
      const { size, quantity } = item;
      // Validar que la talla sea válida y que la cantidad sea un número
      if (!enumSizes.includes(size) || typeof quantity !== 'number' || quantity < 0) {
        throw new Error(`Talla ${size} o cantidad no válidas`);
      }
      return { size, quantity };
    });

    // Actualizar el producto con los nuevos datos
    product.name = name;
    product.image = image;
    product.sizes = formattedSizes;
    product.brand = brand;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  })
);









// Cambiar el estado del producto (activar/desactivar)
adminRoute.put(
  "/product/:id/status",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status_Active } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.status_Active = status_Active;
    await product.save();
    res.status(200).json({ message: `Producto ${status_Active ? "activado" : "desactivado"}` });
  })
);

// Eliminar un producto
adminRoute.delete(
  "/product/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado" });
  })
);

module.exports = adminRoute;
