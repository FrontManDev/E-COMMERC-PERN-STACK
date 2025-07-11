import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
export default function Profile({ id }) {
    const [Error, SetError] = useState(null);
    const [Loading, SetLoading] = useState(false);
    const [User, SetUser] = useState(null);
    const [Show, SetShow] = useState([false, false, false, false, false]);
    const [ShowPassword, SetShowPassword] = useState(false);
    const [UpDateFormData, SetUpDateFormData] = useState({ FirstName: '', LastName: '', Address: '', Email: '', Password: '', file: null });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNTg1OGQwZjItMGI4NC00NzhhLWE1MmEtNDgwMGIwNmUxMWE4IiwiRmlyc3ROYW1lIjoiaGFtaWRhIiwiTGFzdE5hbWUiOiJhYmRlbGthcmltIiwiQWRkcmVzcyI6ItmI2YfYsdin2YYiLCJFbWFpbCI6ImJvdWNoYW1hc29oYWliZUBnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRPMzZxbTN1ZGguenkwaFN2TlNHajRPMTJuT3Yyb0JkU1FYUFdBbkMuR2xHb3Vkb3Rxd0tqVyIsIlByb2ZpbGVJbWFnZSI6InByb2ZpbGVfMTgzNzQ4LmpwZyIsIlJvbGUiOiJVU0VSIiwiU3RhdHVzIjoiT05MSU5FIn0sImlhdCI6MTc1MjI0NzQ3MiwiZXhwIjoxNzUyMjUxMDcyfQ.2_Hf5yH1xvTPXoqg6JDxXD2ols1bd_hewwi5I2FqZFc"
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
    async function handlesubmit(e) {
        e.preventDefault();
        try {
            const updatedata = new FormData();
            updatedata.append("FirstName", UpDateFormData.FirstName);
            updatedata.append("LastName", UpDateFormData.LastName);
            updatedata.append("Address", UpDateFormData.Address);
            updatedata.append("Email", UpDateFormData.Email);
            updatedata.append("Password", UpDateFormData.Password);
            updatedata.append("file", UpDateFormData.file);

            const respones = await axios.put(`http://localhost:5000/api/updateprofile/${id}`, updatedata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { message, User } = respones.data;
            alert(message);
            console.log(message + " " + User);
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
            <form action="" onSubmit={(e) => handlesubmit(e)}>
                <div className="user-info">
                    <div className="user-img">
                        <img src={`http://localhost:5000/usersImage/${User.ProfileImage}`} />
                        <div className="input-form">
                            <label htmlFor="file">Update ProfileImage</label>
                            <input type="file" id="file" onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, file: e.target.files[0] }
                            ))} />
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="input-form">
                            <label onClick={() => SetShow((prev) => {
                                const newState = [...prev];
                                newState[0] = !newState[0];
                                return newState;
                            })}>{"First Name : " + User.FirstName}</label>
                            <input type="text" className={Show[0] ? "active" : ""}  onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, FirstName: e.target.value }
                            ))} />
                        </div>
                        <div className="input-form">
                            <label onClick={() => SetShow((prev) => {
                                const newState = [...prev];
                                newState[1] = !newState[1];
                                return newState;
                            })}>{"Last Name : " + User.LastName}</label>
                            <input type="text" className={Show[1] ? "active" : ""}  onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, LastName: e.target.value }
                            ))} />
                        </div>
                        <div className="input-form">
                            <label htmlFor="" onClick={() => SetShow((prev) => {
                                const newState = [...prev];
                                newState[2] = !newState[2];
                                return newState;
                            })}>{"Address : " + User.Address}</label>
                            <input type="text" className={Show[2] ? "active" : ""}  onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, Address: e.target.value }
                            ))} />
                        </div>
                        <div className="input-form">
                            <label htmlFor="" onClick={() => SetShow((prev) => {
                                const newState = [...prev];
                                newState[3] = !newState[3];
                                return newState;
                            })}>{"Emial : " + User.Email}</label>
                            <input type="email" className={Show[3] ? "active" : ""}  onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, Email: e.target.value }
                            ))} />
                        </div>
                        <div className="input-form">
                            <label htmlFor="" onClick={() => SetShow((prev) => {
                                const newState = [...prev];
                                newState[4] = !newState[4];
                                return newState;
                            })}>{"Password : " + User.Password}</label>
                            <input type={ShowPassword ? "text":"password"} className={Show[4] ? "active" : ""} onChange={(e) => SetUpDateFormData((prev) => (
                                { ...prev, Password: e.target.value }
                            ))} />
                            { Show[4] ? (ShowPassword ?
                                 <IoEyeSharp onClick={() => SetShowPassword(!ShowPassword)} className="icons"/> : 
                                 <BsEyeSlashFill onClick={() => SetShowPassword(!ShowPassword)} className="icons"/>) 
                                 : null}
                        </div>
                    </div>
                </div>
                <button>Update</button>
            </form >
        </div >
    )
}