import style from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import AxiosInstance from '../../axiosInterceptore/axiosInterceptoreToken';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/slices/authSlice";
export default function SideBar() {
    const dispatch = useDispatch();
    async function Logout() {
        try {
            const respone = await AxiosInstance.post('http://localhost:5000/api/logout');
            console.log(respone);
            dispatch(logout());
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className={style.SideBar}>
            <h3 className={style.title}><MdDashboard /> <span> DASHBOARD</span></h3>
            <ul className={style.ul}>
                <NavLink to="/admin/home" className={({ isActive }) => (isActive ? style.active : null)}><li><IoHome />Home</li></NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? style.active : null)}><li><FaUsers />Users</li></NavLink>
                <NavLink to="/admin/Products" className={({ isActive }) => (isActive ? style.active : null)}><li><MdOutlineProductionQuantityLimits />Products</li></NavLink>
                <NavLink to="/admin/Category" className={({ isActive }) => (isActive ? style.active : null)}><li>< MdCategory />Category</li></NavLink>
                <NavLink to="/admin/Orders" className={({ isActive }) => (isActive ? style.active : null)}><li><FaShippingFast />Orders</li></NavLink>
                <NavLink to="/Store" className={({ isActive }) => (isActive ? style.active : null)}><li><FaStoreAlt />Go to Store</li></NavLink>
            </ul>
            <button className={style.button} onClick={() => {
                localStorage.removeItem("token");
                Logout();
                dispatch(logout());
            }}><CiLogout className={style.icon} />Logout</button>
        </div>
    )
}