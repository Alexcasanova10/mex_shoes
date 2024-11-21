
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route} from "react-router";
//  import "./index.css";
// import theme from "./flowbite-theme";
// import { Flowbite } from "flowbite-react";

// import  store  from './Redux/store';
// import DashboardPage from "./pages";
// import SignInPage from "./pages/authentication/sign-in";
// import SignUpPage from "./pages/authentication/sign-up";
// // import EcommerceProductsPage from "./pages/e-commerce/products";
// import EcommerceProductsPage from "./pages/e-commerce/productos";
// import OrdersPage from "./pages/oders/pedidos";
// import ConveyorPage from "./pages/conveyor/banda_trans";

// const container = document.getElementById("root");

// if (!container) {
//   throw new Error("React root element doesn't exist!");
// }

// const root = createRoot(container);

// root.render(
//   <StrictMode>
//      <Provider store={store}>
//       <Flowbite theme={{ theme }}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/dashboard" element={<DashboardPage />} index />
//             <Route path="/sign-in" element={<SignInPage />} />
//             <Route path="/sign-up" element={<SignUpPage />} />

//              <Route path="/productos" element={<EcommerceProductsPage />} />
//             <Route path="/pedidos" element={<OrdersPage />} />
//             <Route path="/conveyor" element={<ConveyorPage />} />
//           </Routes>
          
  

//         </BrowserRouter>
//       </Flowbite>
//     </Provider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Flowbite } from "flowbite-react";

 import "./index.css";




import store, { RootState } from './Redux/store';
import theme from "./flowbite-theme";

import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import DashboardPage from "./pages";
import EcommerceProductsPage from "./pages/e-commerce/productos";
import OrdersPage from "./pages/oders/pedidos";
import ConveyorPage from "./pages/conveyor/banda_trans";

const AppRoutes = () => {
  // Usamos useSelector para verificar si el usuario está autenticado
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/sign-in" element={userInfo ? <Navigate to="/dashboard" replace /> : <SignInPage />} />
      <Route path="/sign-up" element={userInfo ? <Navigate to="/dashboard" replace /> : <SignUpPage />} />

      {/* Rutas protegidas (si no hay userInfo, redirige al login) */}
      <Route path="/dashboard" element={userInfo ? <DashboardPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/productos" element={userInfo ? <EcommerceProductsPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/pedidos" element={userInfo ? <OrdersPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/conveyor" element={userInfo ? <ConveyorPage /> : <Navigate to="/sign-in" replace />} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={userInfo ? "/dashboard" : "/sign-in"} replace />} />
    </Routes>
  );
};

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Flowbite theme={{ theme }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Flowbite>
      </Provider>
    </StrictMode>
  );
}
