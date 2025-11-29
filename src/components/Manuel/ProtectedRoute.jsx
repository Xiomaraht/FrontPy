import { Navigate } from 'react-router-dom';
//Esta funcion envuelve las rutas y las protege, si el usuario no tiene el rol adecuado
export default function ProtectedRoute({ allowedRoles, children, redirectTo = "/auth/login" }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userRole = userInfo.rol;

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}