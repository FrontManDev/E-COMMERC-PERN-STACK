import { Routes , Route} from "react-router-dom";
import Home from "../pages/store/Home/Home";
import Products from "../pages/store/Products/Products";
import Cart from "../pages/store/Cart/Cart";
import Orders from "../pages/admin/Orders/Oders";
import ContactUs from "../pages/store/ContactUs/ContactUs";
import WishList from "../pages/store/WishList/WishList";
export default function StoreRoute(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Products" element={<Products/>}/>
            <Route path="/Contact_us" element={<ContactUs/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Wishlist" element={<WishList/>}/>
            <Route path="/Orders" element={<Orders/>}/>
        </Routes>
    );
}