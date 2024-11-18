
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./pages/Client/ProductDetail";
import Home from "./pages/Client/Home";

import Profile from "./pages/Client/Profile";

import Products from "./components/Products";

import NotFound from "./pages/Client/NotFound"

import Login from "./pages/Client/auth/Login";
import Recuperar from "./pages/Client/auth/Recuperar";
import Reset from "./pages/Client/auth/Reset";

import Register from "./pages/Client/auth/Register";
import Checkout from "./pages/Client/Checkout";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/Client/PlaceOrder";
import OrderConfirmation from "./pages/Client/OrderConfirm";
import { OrderHistory } from "./pages/Client/OrderHistory";

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer
  

  // useEffect(() => {
  //   if (userInfo) {
  //     window.location.href = "/";
  //   }
  // }, [userInfo]);


  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>

          <Route
            exact
            path="/"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>


          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>

          <Route
            exact
            path="/profile"
            element= {userInfo ?  <Profile/>:<Navigate to="/login"></Navigate>}
          ></Route>
           

          <Route exact path="/products" element={<Products />}></Route>

          <Route exact path="/recuperar" element={<Recuperar />}></Route>
          <Route exact path="/reset" element={<Reset />}></Route>


          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />

          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/placeorder" element={<PlaceOrder />}></Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
