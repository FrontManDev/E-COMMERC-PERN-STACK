import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../pages/store/Home/Home";
import StoreRoute from "../routes/StoreRoutes";
export default function StoreLayout() {
    return (
        <div>
            <Header/>
            <StoreRoute/>
            <Footer/>
        </div>
    )
}