import { Routes, Route } from "react-router-dom";
import Product from "./products/product";
import Cart from "./cart/cart";
import Login from "./login/login";
import Register from "./login/register";
import Detailsproduct from "./utils/productdetails/detailsproduct";
function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:id" element={<Detailsproduct />} />
    </Routes>
  );
}

export default Pages;
