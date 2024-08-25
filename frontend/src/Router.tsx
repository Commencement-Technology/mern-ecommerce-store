import { BrowserRouter, Routes, Route } from "react-router-dom";
// public routes
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
// private routes
import UpdateProfile from "./pages/profile/UpdateProfile";
// admin routes
import { AddProduct } from "./pages/admin/AddProduct";
import { Category } from "./pages/categories/Category";
import { ProductList } from "./pages/admin/ProductList";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
// routes
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { AdminRoute } from "./pages/admin/AdminRoute";
import { PageNotFound } from "./pages/PageNotFound";
import ProductDetails from "./pages/products/ProductDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* can be accessed by anyone */}
        <Route index={true} path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* can be accessed by registered users only */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<UpdateProfile />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="categories" element={<Category />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
