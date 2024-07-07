import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import UpdateProfile from "./pages/profile/UpdateProfile";
import { Category } from "./pages/categories/Category";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/categories" element={<Category />} />
        <Route path="*" element={<h1>Page Not Found!!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
