import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
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