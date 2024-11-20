import  { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Layout from "../../Layouts/Layouts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailAction } from "../../Redux/Actions/Order";

// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { orderDetailAction } from "../Redux/Actions/Order";

const OrderConfirmation = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [dispatch, id])
  
  const orderDetailReducer = useSelector((state)=>state.orderDetailReducer)
  const { order, loading } = orderDetailReducer;
  // Confetti state
  const [confettiActive, setConfettiActive] = useState(true);

  // Confetti timer to stop after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        // <div className="flex items-center justify-center min-h-screen bg-white">
        //   {confettiActive && <Confetti />}
        //   <div className="p-8 bg-gray-100 rounded-lg shadow-lg text-center">
        //     <h1 className="text-4xl font-bold text-green-600 mb-4">
        //       Pago Exitoso
        //     </h1>
        //     <p className="text-lg text-gray-700 mb-4">
        //       Gracias Por Su Orden!
        //     </p>
        //     <div className="bg-white p-4 rounded shadow-sm mb-4">
        //       <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        //         Resumen de compra
        //       </h2>
        //       {order && (
        //         <div className="text-left">
        //           <p>
        //             <strong>ID de Orden:</strong> {order._id}
        //           </p>
        //           <p>
        //             <strong>Nombre:</strong> {order.user.name}{" "}
        //           </p>
        //           <p>
        //             <strong>Correo Electrónico:</strong> {order.user.email}
        //           </p>
        //           {/* Add more details as needed */}

        //             <p>
        //               <strong>Precio: </strong>
        //               {order.totalPrice}
                    
        //             </p>

        //             {order.orderItems.map((item, index) => (
        //               <div key={item._id} style={{ marginBottom: "10px" }}>
        //                 <p>
        //                   <strong>Nombre de producto:</strong> {item.name}
        //                 </p>
        //                 <p>
        //                   <strong>Cantidad:</strong> {item.qty}
        //                 </p>
        //                 <p>
        //                   <strong>Precio:</strong> ${item.price}
        //                 </p>
        //                 <p>
        //                   <strong>
        //                     Imagen: 
        //                     <img src={item.image} alt={item.name} style={{ width: "100px" }} />
                            
        //                   </strong>
        //                 </p>
        //               </div>
        //             ))}

        //             <p>
        //               <strong>Nombre de producto:</strong> {order.shippingAddress.address}
        //             </p>
        //             <p>
        //               <strong>Cantidad:</strong> {order.shippingAddress.city}
        //             </p>
        //             <p>
        //               <strong>Código Postal:</strong> {order.shippingAddress.postalCode}
        //             </p>
        //             <p>
        //               <strong>País:</strong> {order.shippingAddress.country}
        //             </p>  
        //         </div>
        //        )} 
        //     </div>
        //     <button
        //       className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7"
        //       onClick={() => {
        //         window.location.href = "/products"; 
        //       }}
        //     >
        //       Continuar Comprando
        //     </button>
        //   </div>
        // </div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100">
  {confettiActive && <Confetti />}
  
  <div className="p-10 bg-white rounded-3xl shadow-2xl text-center max-w-lg">
    {/* Encabezado de éxito */}
    <h1 className="text-5xl font-bold text-green-600 mb-6 animate-pulse">
      ¡Pago Exitoso!
    </h1>
    <p className="text-lg text-gray-600 mb-8">
      Gracias por su compra. ¡Esperamos que disfrute sus productos!
    </p>

    {/* Resumen de compra */}
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Resumen de compra</h2>
      
      {order && (
        <div className="text-left space-y-4">
          <p className="text-lg">
            <strong>ID de Orden:</strong> {order._id}
          </p>
          <p className="text-lg">
            <strong>Cliente:</strong> {order.user.name}
          </p>
          <p className="text-lg">
            <strong>Correo Electrónico:</strong> {order.user.email}
          </p>
          <p className="text-lg">
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>

          {/* Lista de productos */}
          <div className="space-y-6">
            {order.orderItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <p>
                  <strong>Producto:</strong> {item.name}
                </p>
                <p>
                  <strong>Cantidad:</strong> {item.qty}
                </p>
                <p>
                  <strong>Precio:</strong> ${item.price}
                </p>
                <p>
                  <strong>Talla:</strong> {item.sizes}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dirección de envío */}
          <div className="mt-8 bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Dirección de Envío</h3>
            <p>
              <strong>Dirección:</strong> {order.shippingAddress.address}
            </p>
            <p>
              <strong>Ciudad:</strong> {order.shippingAddress.city}
            </p>
            <p>
              <strong>Código Postal:</strong> {order.shippingAddress.postalCode}
            </p>
            <p>
              <strong>País:</strong> {order.shippingAddress.country}
            </p>
          </div>
        </div>
      )}
    </div>

    {/* Botón de continuar comprando */}
    <button
      className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7"
      onClick={() => (window.location.href = "/products")}
    >
      Continuar Comprando
    </button>
  </div>
</div>

       )} 
    </Layout>
  );
};

export default OrderConfirmation;
