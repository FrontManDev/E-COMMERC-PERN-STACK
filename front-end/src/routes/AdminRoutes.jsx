import { Routes, Route } from "react-router-dom";
import Users from "../pages/admin/Users/Users";
import Products from "../pages/admin/Products/Products";
import Category from "../pages/admin/Category/Category";
import AddCategoy from "../pages/admin/AddCategory/AddCategory";
import AddProducts from "../pages/admin/Products/Products";
import Orders from "../pages/admin/Orders/Oders";
export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/adminusers" element={<Users />} />
            <Route path="/adminProducts" element={<Products />} />
            <Route path="/adminCategory" element={<Category />} />
            <Route path="/adminAddCategoy" element={<AddCategoy />} />
            <Route path="/adminAddProducts" element={<AddProducts />} />
            <Route path="/adminOrders" element={<Orders />} />
        </Routes>
    )
}