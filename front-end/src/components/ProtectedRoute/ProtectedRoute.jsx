import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children,Role}){
    if(!localStorage.getItem("token")){
        return <Navigate to="/authentication"/>
    }
    else if(Role === "ADMINE"){
        
    }
    return children;
}