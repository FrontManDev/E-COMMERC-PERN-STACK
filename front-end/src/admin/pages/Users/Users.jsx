import axios from "axios"
import { useEffect, useState } from "react"
export default function Users() {
    const [AllUsers, SetAllUsers] = useState([]);
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(false);
    async function FetchUsers() {
        try {
            const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNTg1OGQwZjItMGI4NC00NzhhLWE1MmEtNDgwMGIwNmUxMWE4IiwiRmlyc3ROYW1lIjoiaGFtaWRhIiwiTGFzdE5hbWUiOiJhYmRlbGthcmltIiwiQWRkcmVzcyI6ItmI2YfYsdin2YYiLCJFbWFpbCI6ImJvdWNoYW1hc29oYWliZUBnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRPMzZxbTN1ZGguenkwaFN2TlNHajRPMTJuT3Yyb0JkU1FYUFdBbkMuR2xHb3Vkb3Rxd0tqVyIsIlByb2ZpbGVJbWFnZSI6InByb2ZpbGVfMTgzNzQ4LmpwZyIsIlJvbGUiOiJVU0VSIiwiU3RhdHVzIjoiT05MSU5FIn0sImlhdCI6MTc1MjE0ODI1OSwiZXhwIjoxNzUyMTUxODU5fQ.QcwSYUJZ8aUjLsqJ_vTIAPmBX-lOqU5rNJ2ZlAi58qI";
            SetLoading(true);
            const reponse = await axios.get("http://localhost:5000/api/allusers",
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                }
            );
            const { message, numberOfUser, AllUsers } = reponse.data;
            SetAllUsers(AllUsers);
        } catch (error) {
            SetError(error.message);
        }
    }
    useEffect(() => {
        FetchUsers();
    }, []);
    return (
        <div>
            {AllUsers.map((user, index) => (
                <div key={user.id}>
                    <p>{user.FirstName}</p>
                    <img src={`http://localhost:5000/usersImage/${user.ProfileImage}`} alt="" />
                </div>
            ))}
        </div>
    )
}