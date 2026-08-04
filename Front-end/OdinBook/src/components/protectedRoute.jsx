import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../services/authContext.jsx"
import { useContext } from "react";

function ProtectedRoute() {
    const {auth} = useContext(AuthContext);

    if(!auth.accessToken){
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default ProtectedRoute;