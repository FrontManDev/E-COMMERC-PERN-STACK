import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
export default function Profile({ id }) {
    const [Error, SetError] = useState(null);
    const [Loading, SetLoading] = useState(false);
    const [User, SetUser] = useState(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNTg1OGQwZjItMGI4NC00NzhhLWE1MmEtNDgwMGIwNmUxMWE4IiwiRmlyc3ROYW1lIjoiaGFtaWRhIiwiTGFzdE5hbWUiOiJhYmRlbGthcmltIiwiQWRkcmVzcyI6ItmI2YfYsdin2YYiLCJFbWFpbCI6ImJvdWNoYW1hc29oYWliZUBnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRPMzZxbTN1ZGguenkwaFN2TlNHajRPMTJuT3Yyb0JkU1FYUFdBbkMuR2xHb3Vkb3Rxd0tqVyIsIlByb2ZpbGVJbWFnZSI6InByb2ZpbGVfMTgzNzQ4LmpwZyIsIlJvbGUiOiJVU0VSIiwiU3RhdHVzIjoiT0ZGTElORSJ9LCJpYXQiOjE3NTIyMzAyOTMsImV4cCI6MTc1MjIzMzg5M30.YSjVvDelUSOmquDs594Vjqh0781593ov0H6nIB4Wzks"
    async function FetchUser() {
        try {
            SetLoading(true);
            const respones = await axios.get(`http://localhost:5000/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { message, user } = respones.data;
            SetUser(user);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    console.log(User);
    useEffect(() => {
        FetchUser();
    }, []);
    if (Loading) {
        return (<div className="laoding">
            Laoding...
        </div>);
    }
    if (Error) {
        return (<div className="error">
            {Error}
        </div>)
    }
    return (
        User &&
        <div className="user-container">
            <div className="user-info">
                <div className="user-img">
                    <img src={`http://localhost:5000/usersImage/${User.ProfileImage}`} />
                    <div className="input-form">
                        <label htmlFor="file">Update ProfileImage</label>
                        <input type="file" id="file" />
                    </div>
                </div>
                <div className="user-info">
                    <div className="input-form">
                        <label>{"First Name : " + User.FirstName}</label>
                        <input type="text" />
                    </div>
                    <div className="input-form">
                        <label>{"Last Name : " + User.LastName}</label>
                        <input type="text" />
                    </div>
                    <div className="input-form">
                        <label htmlFor="">{"Address : " + User.Address}</label>
                        <input type="text" />
                    </div>
                    <div className="input-form">
                        <label htmlFor="">{"Eamil : " + User.Email}</label>
                        <input type="email" />
                    </div>
                    <div className="input-form">
                        <label htmlFor="">{"Password : " + User.Password}</label>
                        <input type="password" />
                    </div>
                </div>
            </div>
        </div>
    )
}