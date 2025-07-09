import './Authentication.css';
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from 'axios';
export default function Authentication() {
    const [IsLogin, SetIsLogin] = useState(true);
    const [ShowPassword, SetShowPassword] = useState([false, false, false]);
    const [IsMatchPassword, SetIsMatchPassword] = useState({ Password: '', confirmPassword: '' });
    const [LoginFromData, SetLoginFormData] = useState({ Email: '', Password: '' });
    const [SingeFormData, SetSingeFormdata] = useState({ FirstName: '', LastName: '', Address: '', Email: '', Password: '', file: null });
    async function Signein() {
        try {
            if (IsMatchPassword.Password === IsMatchPassword.confirmPassword) {
                const SingeData = new FormData();
                SingeData.append("FirstName", SingeFormData.FirstName);
                SingeData.append("LastName", SingeFormData.LastName);
                SingeData.append("Address", SingeFormData.Address);
                SingeData.append("Email", SingeFormData.Email);
                SingeData.append("Password", SingeFormData.Password);
                SingeData.append("ProfileImage", SingeFormData.file);
                const response = await axios.post("http://localhost:5000/api/singeup", SingeData);
                const { message, NewUser, token } = response.data;
                console.log(token);
                console.log(NewUser);
                alert(message);
            }
            else {
                alert('password is not match');
            }
        } catch (error) {
            alert(error.response.data.message || error.response.data.Error);

        }
    }
    async function Login() {
        try {
            const response = await axios.post("http://localhost:5000/api/login", LoginFromData);
            const { message, ExisteUser, token } = response.data;
            console.log(token);
            console.log(ExisteUser);
            alert(message);
        } catch (Error) {
            if (Error.response && Error.response.data) {
                alert(Error.response.data.message || Error.response.data.Error);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    }

    function handlesubmit(e) {
        e.preventDefault();
        IsLogin ? Login() : Signein();
    }
    return (
        <div className="fom-container">
            <h2>Wellcome</h2>
            <p>Get started with us for best experience shopping</p>
            <div className="login-social-media-accounts">
                <button><FaGoogle />Google</button>
                <button><FaFacebookF />Facebook</button>
            </div>
            <p>or</p>
            <form action="" onSubmit={(e) => handlesubmit(e)}>
                {
                    IsLogin ? <div className="login">
                        <div className="form-input">
                            <label htmlFor="">Email</label>
                            <input type="Email" required name="Email" onChange={(e) => SetLoginFormData((prev) => ({
                                ...prev,
                                Email: e.target.value
                            }))} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="" required>Password</label>
                            <input type={ShowPassword[0] ? "text" : "password"} required name="Password" onChange={(e) => SetLoginFormData((prev) => ({
                                ...prev,
                                Password: e.target.value
                            }))} />
                            {
                                ShowPassword[0] ? <IoEyeSharp className="icons" onClick={() => SetShowPassword(prev => {
                                    const NewState = [...prev];
                                    NewState[0] = !NewState[0];
                                    return NewState;
                                })} /> : <BsEyeSlashFill className="icons" onClick={() => SetShowPassword(prev => {
                                    const NewState = [...prev];
                                    NewState[0] = !NewState[0];
                                    return NewState;
                                })} />
                            }
                        </div>
                        <p>dont have account?<span onClick={() => SetIsLogin(!IsLogin)}>create one</span></p>
                    </div>
                        :
                        <div className="signe-in">
                            <div className="form-input-left-right">
                                <div className="form-input">
                                    <label htmlFor="">FirstName </label>
                                    <input type="text" required name="FristName" onChange={(e) => SetSingeFormdata((prev) => ({
                                        ...prev,
                                        FirstName: e.target.value
                                    }))} />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="">LastName </label>
                                    <input type="text" required name="LastName" onChange={(e) => SetSingeFormdata((prev) => ({
                                        ...prev,
                                        LastName: e.target.value
                                    }))} />
                                </div>
                            </div>
                            <div className="form-input-left-right">
                                <div className="form-input">
                                    <label htmlFor="">Address </label>
                                    <input type="text" required name="Address" onChange={(e) => SetSingeFormdata((prev) => ({
                                        ...prev,
                                        Address: e.target.value
                                    }))} />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="">Email </label>
                                    <input type="text" required name="Email" onChange={(e) => SetSingeFormdata((prev) => ({
                                        ...prev,
                                        Email: e.target.value
                                    }))} />
                                </div>
                            </div>
                            <div className="form-input-left-right">
                                <div className="form-input">
                                    <label htmlFor="">Password  </label>
                                    <input type={ShowPassword[1] ? "text" : "password"} required name="Password" onChange={(e) => {
                                        SetSingeFormdata((prev) => ({
                                            ...prev,
                                            Password: e.target.value,
                                        }));
                                        SetIsMatchPassword((prev) => ({
                                            ...prev,
                                            Password: e.target.value,
                                        }));
                                    }}
                                    />
                                    {
                                        ShowPassword[1] ? <IoEyeSharp className="icons" onClick={() => SetShowPassword(prev => {
                                            const NewState = [...prev];
                                            NewState[1] = !NewState[1];
                                            return NewState;
                                        })} /> : <BsEyeSlashFill className="icons" onClick={() => SetShowPassword(prev => {
                                            const NewState = [...prev];
                                            NewState[1] = !NewState[1];
                                            return NewState;
                                        })} />
                                    }
                                </div>
                                <div className="form-input">
                                    <label htmlFor="">ConffirmePassword  </label>
                                    <input type={ShowPassword[2] ? "text" : "password"} required name="ConffirmePassword" onChange={(e) => SetIsMatchPassword((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value
                                    }))} />
                                    {
                                        ShowPassword[2] ? <IoEyeSharp className="icons" onClick={() => SetShowPassword(prev => {
                                            const NewState = [...prev];
                                            NewState[2] = !NewState[2];
                                            return NewState;
                                        })} /> : <BsEyeSlashFill className="icons" onClick={() => SetShowPassword(prev => {
                                            const NewState = [...prev];
                                            NewState[2] = !NewState[2];
                                            return NewState;
                                        })} />
                                    }
                                </div>
                            </div>
                            <div className="form-input file-input-form">
                                <input type="file" id="file" required onChange={(e) => SetSingeFormdata((prev) => ({
                                    ...prev,
                                    file: e.target.files[0]
                                }))} />
                                <label htmlFor="file">Profile Picture </label>
                            </div>
                            <p>you have an account?<span onClick={() => SetIsLogin(!IsLogin)}>Login</span></p>
                        </div>
                }
                <button className='submit-btn'>{IsLogin ? "Login" : "Singein"}</button>
            </form>
        </div>
    )
}