import SideBar from "../components/SideBar/SideBar";
import AdminRoutes from "../routes/AdminRoutes";
export default function AdminLayout() {
    return (
        <>
            <SideBar />
            <AdminRoutes />
        </>
    )
}