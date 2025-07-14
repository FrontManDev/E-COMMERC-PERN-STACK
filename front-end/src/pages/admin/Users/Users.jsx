import axios from "axios";
import styles from './Users.module.css';
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
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiOGJmYmQ0N2MtODc5MC00YTQ5LTliYzMtMTBiYzhhY2JkMTY0IiwiRmlyc3ROYW1lIjoiaGFtaWRhIiwiTGFzdE5hbWUiOiJhYmRlbGthcmltIiwiQWRkcmVzcyI6ItmI2YfYsdin2YYiLCJFbWFpbCI6ImhhbWlkYWthaW02N0BnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRJNXZCbkVjMlFkSUI2Zzg0VElrdi91dUU0U2ZmVlVVSzYwQ0tGTExvRFpMM2t6TkR1YjBTbSIsIlByb2ZpbGVJbWFnZSI6InByb2ZpbGVfMzkxMzMzLmpwZyIsIlJvbGUiOiJVU0VSIiwiU3RhdHVzIjoiT0ZGTElORSIsImNyZWF0ZWRBdCI6IjIwMjUtMDctMTJUMTA6MTM6MzMuODQ1WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDctMTRUMTQ6Mzg6MzYuMDkzWiJ9LCJpYXQiOjE3NTI1MjY1MDMsImV4cCI6MTc1MjUzMDEwM30.YHNORNOyaM49mFX9WP7Ttnr_au85tvsqibiTWy7DfZ8";

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

    if (Loading) return <div className={styles.loading}>...Loading</div>;
    if (Error) return <div className={styles.error}>{Error}</div>;

    return (
        <div className={styles.usersContainer}>
            <div className={styles.usersType}>
                <div className={`${styles.users} ${styles.onlineUsers}`}>
                    <h3>Online users</h3>
                    <h2><AiOutlineUserSwitch />{OnlineUsers}</h2>
                </div>
                <div className={`${styles.users} ${styles.offlineUsers}`}>
                    <h3>Offline users</h3>
                    <h2><span><RiUserSharedLine /></span>{OfflineUsers}</h2>
                </div>
                <div className={`${styles.users} ${styles.blockUsers}`}>
                    <h3>blocked users</h3>
                    <h2><span><FaUserSlash /></span>{BlockUsers}</h2>
                </div>
                <div className={`${styles.users} ${styles.totalUsers}`}>
                    <h3>Total users</h3>
                    <h2><span><HiUsers /></span>{TotalUsers}</h2>
                </div>
            </div>
            <table className={styles.usersTable}>
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
                    {AllUsers.map((user) => (
                        <tr key={user.id}>
                            <td><img src={`http://localhost:5000/usersImage/${user.ProfileImage}`} alt="User" /></td>
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Address}</td>
                            <td>{user.Email}</td>
                            <td data-status={user.Status.toLowerCase()}>{user.Status}</td>
                            <td>
                                <button onClick={() => {
                                    user.Status === "BLOCK" ? Deblock(user.id) : Block(user.id);
                                }}>
                                    {user.Status === "BLOCK" ? "DEBLOCK" : "BLOCK"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}