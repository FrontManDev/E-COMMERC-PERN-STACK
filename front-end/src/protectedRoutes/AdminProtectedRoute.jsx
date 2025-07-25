import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
    
    if (!localStorage.getItem('token')) {
        return <Navigate to="/" replace />;
    }

    if (localStorage.getItem('role')!== "ADMIN") {
        return <Navigate to="/User" replace />;
    }

    return children;
}
