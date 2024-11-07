
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import Products from "./components/Products";

import NotFound from "./pages/NotFound"

import Login from "./pages/auth/Login";
import Recuperar from "./pages/auth/Recuperar";
import Reset from "./pages/auth/Reset";

import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/PlaceOrder";
import OrderConfirmation from "./pages/OrderConfirm";
import { OrderHistory } from "./pages/OrderHistory";

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer
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
