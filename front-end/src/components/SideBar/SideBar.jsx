import style from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
export default function SideBar() {
    return (
        <div className={style.SideBar}>
            <h3 className={style.title}><MdDashboard /> <span> DASHBOARD</span></h3>
            <ul className={style.ul}>
                <NavLink to="/adminhome" className={({ isActive }) => (isActive ? style.active : null)}><li><IoHome />Home</li></NavLink>
                <NavLink to="/adminusers" className={({ isActive }) => (isActive ? style.active : null)}><li><FaUsers />Users</li></NavLink>
                <NavLink to="/adminProducts" className={({ isActive }) => (isActive ? style.active : null)}><li><IoHome />Products</li></NavLink>
                <NavLink to="/adminCategory" className={({ isActive }) => (isActive ? style.active : null)}><li><FaUsers />Category</li></NavLink>
                <NavLink to="/adminOrders" className={({ isActive }) => (isActive ? style.active : null)}><li><FaUsers />Orders</li></NavLink>
            </ul>
            <button className={style.button} onClick={()=>{
                localStorage.removeItem("token");
            }}><CiLogout className={style.icon}/>Logout</button>
        </div>
    )
}