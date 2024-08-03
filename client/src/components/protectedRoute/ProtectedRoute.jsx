import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, user }) => {
    return user ? element : <Navigate to="/login" />;
};



