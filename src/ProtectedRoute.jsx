import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />; // Якщо токена немає — редирект на логін
    }

    try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        console.log("decoded role -  ",role);
        return children; // Якщо токен валідний — відображаємо сторінку
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" />; // Якщо токен некоректний — редирект
    }

    /*if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }*/
};

export default ProtectedRoute;
