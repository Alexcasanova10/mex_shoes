const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const nodemailer = require('nodemailer')
const User = require("../models/User.js");
const Product = require("../models/Product.js");

//ruta antigua, es la oroginal buena
// orderRoute.post("/",protect, asyncHandler(async (req, res) => {
//     const {
//       orderItems,
//       shippingAddress,
//       paymentMethods,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//       price,
//     } = req.body;
//     console.log(orderItems)

//     if (orderItems && orderItems.length === 0) {
//       res.status(400);
//       throw new Error("No se encontraorn ordenes");
//     } else {
//       const order = new Order({
//         orderItems,
//         shippingAddress,
//         paymentMethods,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//         price,
//         user: req.user._id,
//       });

//       const createdOrder = await order.save();

//       const transporter= nodemailer.createTransport({
//         service: 'Gmail',
//         auth:{
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     }) 

//     const userEmail = req.user.email;

//     const orderDetails = orderItems
//     .map(
//       (item) =>
//         `- ${item.name} (Cantidad: ${item.qty}, Precio: $${item.price.toFixed(
//           2
//         )})`
//     )
//     .join("\n");

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: `MexShoes: ¡Compra Exitosa! - ID de Orden: ${createdOrder._id}`,
//       text: `
//       Hola ${req.user.name},

//       ¡Gracias por tu compra! Aquí están los detalles de tu pedido:

//       **Productos Comprados:**
//       ${orderDetails}

//       **Total Pagado:** $${totalPrice}

//       **Método de Pago:** Paypal

//       **Dirección de Envío:**
//       - Dirección: ${shippingAddress.address}
//       - Ciudad: ${shippingAddress.city}
//       - Código Postal: ${shippingAddress.postalCode}
//       - País: ${shippingAddress.country}

//       Gracias por confiar en nosotros.
//       `,
//     };

//     res.status(201).json(createdOrder);
    
//     await transporter.sendMail(mailOptions);
     
    
//   }
// })
// );
///*Aqui acaba la post order original */


 

orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No se encontraron órdenes");
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    // Reducir el stock y las cantidades por talla
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        res.status(404);
        throw new Error(`Producto con ID ${item.product} no encontrado`);
      }

      // Validar que las tallas sean proporcionadas
      if (!item.sizes || !item.qty) {
        res.status(400);
        throw new Error(
          `Talla o cantidad no especificada para el producto ${item.product}`
        );
      }

      // Reducir el stock general
      product.countInStock -= item.qty;

      // Reducir la cantidad de la talla seleccionada
      const sizeIndex = product.sizes.findIndex((s) => s.size === item.sizes);

      if (sizeIndex === -1) {
        res.status(400);
        throw new Error(`Talla ${item.sizes} no encontrada en el producto`);
      }

      product.sizes[sizeIndex].quantity -= item.qty;

      // Validar si el stock de la talla es insuficiente
      if (product.sizes[sizeIndex].quantity < 0) {
        res.status(400);
        throw new Error(`Stock insuficiente para la talla ${item.size}`);
      }

      await product.save();
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const userEmail = req.user.email;
  
    const orderDetails = orderItems
      .map(
        (item) =>
          `- ${item.name} (Cantidad: ${item.qty}, Precio: $${item.price.toFixed(2)}, Talla: ${item.sizes})`
      )
      .join("\n");
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `MexShoes: ¡Compra Exitosa! - ID de Orden: ${createdOrder._id}`,
      text: `
        Hola ${req.user.name},
  
        ¡Gracias por tu compra! Aquí están los detalles de tu pedido:
  
        **Productos Comprados:**
        ${orderDetails}

        
  
        **Total Pagado:** $${totalPrice}
  
        **Método de Pago:** Paypal
  
        **Dirección de Envío:**
        - Dirección: ${shippingAddress.address}
        - Ciudad: ${shippingAddress.city}
        - Código Postal: ${shippingAddress.postalCode}
        - País: ${shippingAddress.country}
  
        Gracias por confiar en nosotros.
      `,
    };
  
    await transporter.sendMail(mailOptions);










    res.status(201).json(createdOrder);
  })
);



orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

//update order status for payment

//order payment

orderRoute.put(
  "/:id/payment",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.create_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      console.log(order)

      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("No se encontró la orden");
    }
  })
);

//order lists

orderRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("No se encontraron órdenes");
    }
  })
);



//stripe payment 



module.exports = orderRoute;