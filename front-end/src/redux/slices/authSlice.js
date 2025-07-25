import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const InitialValues = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: InitialValues,
    reducers: {
        authentication: (state, action) => {
            const { token } = action.payload;
            const decode = jwtDecode(token);
            const role = decode.Role;
            state.token = token;
            state.role  = role;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            localStorage.setItem("token", null);
            localStorage.setItem("role", null);
        }
    }
});

export const { authentication , logout } = AuthSlice.actions;

export default AuthSlice.reducer;