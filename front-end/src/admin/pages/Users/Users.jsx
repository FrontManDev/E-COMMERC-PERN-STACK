import axios from "axios";
import './Users.css';
import { useEffect, useState } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUserSlash } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

export default function Users() {
    const [AllUsers, SetAllUsers] = useState([]);
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(false);
    const [TotalUsers, SetTotalUsers] = useState(0);
    const [BlockUsers, SetBlockUsers] = useState(0);
    const [OnlineUsers, SetOnlineUsers] = useState(0);
    const [OfflineUsers, SetOfflineUsers] = useState(0);
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNTg1OGQwZjItMGI4NC00NzhhLWE1MmEtNDgwMGIwNmUxMWE4IiwiRmlyc3ROYW1lIjoiaGFtaWRhIiwiTGFzdE5hbWUiOiJhYmRlbGthcmltIiwiQWRkcmVzcyI6ItmI2YfYsdin2YYiLCJFbWFpbCI6ImJvdWNoYW1hc29oYWliZUBnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRPMzZxbTN1ZGguenkwaFN2TlNHajRPMTJuT3Yyb0JkU1FYUFdBbkMuR2xHb3Vkb3Rxd0tqVyIsIlByb2ZpbGVJbWFnZSI6InByb2ZpbGVfMTgzNzQ4LmpwZyIsIlJvbGUiOiJVU0VSIiwiU3RhdHVzIjoiT0ZGTElORSJ9LCJpYXQiOjE3NTIxNjEzMTcsImV4cCI6MTc1MjE2NDkxN30.WszWUdUKO3FK6mEBE9q-oGjNMsym_eP0MMWqyd-a5Ew";
    async function FetchUsers() {
        try {
            SetLoading(true);
            const reponse = await axios.get("http://localhost:5000/api/allusers",
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                }
            );
            const { totlausers, AllUsers, blockusers, onlineusers, offlineusers } = reponse.data;
            SetAllUsers(AllUsers);
            SetTotalUsers(totlausers);
            SetBlockUsers(blockusers);
            SetOnlineUsers(onlineusers);
            SetOfflineUsers(offlineusers);
            SetAllUsers(AllUsers);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function Block(id) {
        try {
            if (window.confirm("Are you sure you want to block this user?")) {
                const reponse = await axios.put(`http://localhost:5000/api/blockuser/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                const { message } = reponse.data;
                alert(message);
                FetchUsers();
            } else {
                alert("blocking cancelled.");
            }
        } catch (error) {
            SetError(error.message);
        }
    }
    async function Deblock(id) {
        try {
            if (window.confirm("Are you sure you want to deblock this user?")) {
                const reponse = await axios.put(`http://localhost:5000/api/deblockuser/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                const { message } = reponse.data;
                alert(message);
                FetchUsers();
            } else {
                alert("Deblocking cancelled.");
            }
        } catch (error) {
            SetError(error.message);
        }
    }
    useEffect(() => {
        FetchUsers();
    }, []);
    if (Loading) return <div className="loading">...Loading</div>;
    if (Error) return <div className="error">{Error}</div>;
    return (
        <div className="users-container">
            <div className="users-type">
                <div className="users online-users">
                    <h3>Online users</h3>
                    <h2><AiOutlineUserSwitch />{OnlineUsers}</h2>
                </div>
                <div className="users offline-users">
                    <h3>Offline users</h3>
                    <h2><span><RiUserSharedLine /></span>{OfflineUsers}</h2>
                </div>
                <div className="users block-users">
                    <h3>blocked users</h3>
                    <h2><span><FaUserSlash /></span>{BlockUsers}</h2>
                </div>
                <div className="users total-users">
                    <h3>Total users</h3>
                    <h2><span><HiUsers /></span>{TotalUsers}</h2>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        AllUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td><img src={`http://localhost:5000/usersImage/${user.ProfileImage}`} /></td>
                                <td>{user.FirstName}</td>
                                <td>{user.LastName}</td>
                                <td>{user.Address}</td>
                                <td>{user.Email}</td>
                                <td>{user.Status}</td>
                                <td>
                                    <button onClick={() => {
                                        user.Status === "BLOCK" ? Deblock(user.id) : Block(user.id);
                                    }}>
                                        {user.Status === "BLOCK" ? "DEBLOCK" : "BLOCK"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}