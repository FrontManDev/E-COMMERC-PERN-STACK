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
                <NavLink to="/adminhome" className={({isActive})=>(isActive ? "active" : " ")}><li><IoHome />Home</li></NavLink>
                <NavLink to="/adminusers"  className={({isActive})=>(isActive ? "active" : " ")}><li><FaUsers />Users</li></NavLink>
            </ul>
        </div>
    )
}