import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
export default function SideBar() {
    return (
        <div className="SideBar">
            <h3><MdDashboard /> <span> DASHBOARD</span></h3>
            <ul>
                <NavLink to="/adminhome" className={({ isActive }) => (isActive ? "active" : " ")}><li><IoHome />Home</li></NavLink>
                <NavLink to="/adminusers" className={({ isActive }) => (isActive ? "active" : " ")}><li><FaUsers />Users</li></NavLink>
                <NavLink to="/adminProducts" className={({ isActive }) => (isActive ? "active" : " ")}><li><IoHome />Products</li></NavLink>
                <NavLink to="/adminCategory" className={({ isActive }) => (isActive ? "active" : " ")}><li><FaUsers />Category</li></NavLink>
                <NavLink to="/adminOrders" className={({ isActive }) => (isActive ? "active" : " ")}><li><FaUsers />Orders</li></NavLink>
            </ul>
        </div>
    )
}