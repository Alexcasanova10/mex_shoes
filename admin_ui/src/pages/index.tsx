// /* eslint-disable jsx-a11y/anchor-is-valid */
// import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
// import type { FC } from "react";
// import Chart from "react-apexcharts";
// import NavbarSidebarLayout from "../layouts/navbar-sidebar";

// const DashboardPage: FC = function () {
//   return (
//     <NavbarSidebarLayout>
    
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 p-4">
      
//       <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold">$ponercount de ventas</h2>
//         </div>
//         <p className="mt-2">Total de ventas</p>
//       </div>


//       <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold">cantproductos</h2>
//         </div>
//         <p className="mt-2">Productos en stock</p>
//       </div>

//       <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold"><a href="http://localhost:5173/">MexShoes.com</a></h2>
//         </div>
//         <p className="mt-2">Sitio Web</p>
//       </div>
//     </div>
//   </NavbarSidebarLayout>
//   );
// };
 

// export default DashboardPage;
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { productListAction } from "../Redux/Actions/Product";
import { orderListAction, fetchTotalSalesAction } from "../Redux/Actions/Order";

import { RootState, AppDispatch } from "../Redux/store";

const DashboardPage: FC = function () {
  // Tipar el dispatch correctamente usando AppDispatch
  const dispatch: AppDispatch = useDispatch();

  // Obtener el estado de los productos desde Redux
  const products = useSelector((state: RootState) => state.productListReducer.products);

  const orders = useSelector((state: RootState) => state.orderListReducer.orders);
  const totalSales = useSelector((state: RootState) => state.orderListReducer.totalSales);



  // Ejecutar la acción para obtener los productos al cargar el componente
  useEffect(() => {
    dispatch(productListAction());
    dispatch(fetchTotalSalesAction());

  }, [dispatch]);

  // Contar la cantidad de productos
  const totalProductos = products?.length || 0;

  return (
    <NavbarSidebarLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 p-4">
        {/* Sección de total de ventas (puedes personalizarla después) */}
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold">${totalSales.toFixed(2) }</h2>
          <p className="mt-2">Total de ventas</p>
        </div>

        {/* Sección de productos en stock */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Cantidad de Productos: {totalProductos}</h2>
          </div>
          <p className="mt-2">Stock</p>
        </div>

        {/* Enlace al sitio web */}
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold">
            <a href="https://mex-shoes-client.vercel.app">MexShoes.com</a>
          </h2>
          <p className="mt-2">Sitio Web</p>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;

