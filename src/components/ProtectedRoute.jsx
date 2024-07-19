import React from 'react';
import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ profile, requiredProfile }) => {
    // if (profile !== requiredProfile) {
    if (profile >= requiredProfile) {
        return <Outlet />;
    }
    return <Navigate to="/access-denied" replace />;
};

export default ProtectedRoute;
