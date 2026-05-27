import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    /*
    ========================================
    CONTEXT
    ========================================
    */

    const { user, loading } = useContext(AuthContext);

    /*
    ========================================
    LOADING
    ========================================
    */

    if (loading) {
        return <h1>Loading...</h1>;
    }

    /*
    ========================================
    NOT LOGGED IN
    ========================================
    */

    if (!user) {
        return <Navigate to="/login" />;
    }

    /*
    ========================================
    ALLOW ACCESS
    ========================================
    */

    return children;
}

export default ProtectedRoute;