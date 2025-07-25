import { Routes, Route } from "react-router-dom";
import Users from "../pages/admin/Users/Users";
import Products from "../pages/admin/Products/Products";
import Category from "../pages/admin/Category/Category";
import AddCategoy from "../pages/admin/AddCategory/AddCategory";
import AddProducts from "../pages/admin/AddProducts/AddProducts";
import Orders from "../pages/admin/Orders/Oders";
import EditProducts from "../pages/admin/EditProducts/EditProducts";
export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="users" element={<Users />} />
            <Route path="Products" element={<Products />} />
            <Route path="Category" element={<Category />} />
            <Route path="AddCategoy" element={<AddCategoy />} />
            <Route path="AddProducts" element={<AddProducts />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="editproduct/:id" element={<EditProducts/>} />
        </Routes>
    )
}