const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const nodemailer = require('nodemailer')
const User = require("../models/User.js");

orderRoute.post("/",protect, asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;
    console.log(orderItems)

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No se encontraorn ordenes");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });

      const createdOrder = await order.save();

      const transporter= nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }) 

    const userEmail = req.user.email;

    const orderDetails = orderItems
    .map(
      (item) =>
        `- ${item.name} (Cantidad: ${item.qty}, Precio: $${item.price.toFixed(
          2
        )})`
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

    res.status(201).json(createdOrder);
    
    await transporter.sendMail(mailOptions);
     
    
  }
})
);

// const newOrder =  new UserOrder({
//   userId: '1',
//   customerId: '1',
//   productId: '652b2e458077fd5b243a06ad',
//   quantity: 1,
//   subtotal: 12 / 100,
//   total: 12 / 100,
//   payment_status: '3',
// });
//order detail

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