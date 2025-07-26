import Authentication from "./authentication/Authentication";
import AdminLayout from "./layouts/AdminLayout";
import StoreLayout from "./layouts/StoreLayout";
import { Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";
import NotFound from "./notfound/NotFound";
import Home from "./pages/store/Home/Home";
import Products from "./pages/store/Products/Products";
import ContactUs from "./pages/store/ContactUs/ContactUs";
import Cart from "./pages/store/Cart/Cart";
import Orders from "./pages/admin/Orders/Oders";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
  
      <Route path="/Store/*" element={<StoreLayout />} />

      <Route path="/admin/*" element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
