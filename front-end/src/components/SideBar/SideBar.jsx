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
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className={style.SideBar}>
            <h3 className={style.title}><MdDashboard /> <span> DASHBOARD</span></h3>
            <ul className={style.ul}>
                <NavLink to="/adminhome" className={({ isActive }) => (isActive ? style.active : null)}><li><IoHome />Home</li></NavLink>
                <NavLink to="/adminusers" className={({ isActive }) => (isActive ? style.active : null)}><li><FaUsers />Users</li></NavLink>
                <NavLink to="/adminProducts" className={({ isActive }) => (isActive ? style.active : null)}><li><MdOutlineProductionQuantityLimits />Products</li></NavLink>
                <NavLink to="/adminCategory" className={({ isActive }) => (isActive ? style.active : null)}><li>< MdCategory />Category</li></NavLink>
                <NavLink to="/adminOrders" className={({ isActive }) => (isActive ? style.active : null)}><li><FaShippingFast />Orders</li></NavLink>
                <NavLink to="/" className={({ isActive }) => (isActive ? style.active : null)}><li><FaStoreAlt />Go to Store</li></NavLink>
            </ul>
            <button className={style.button} onClick={() => {
                localStorage.removeItem("token");
                Logout();
                dispatch(logout());
            }}><CiLogout className={style.icon} />Logout</button>
        </div>
    )
}