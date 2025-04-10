import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjusted path to match the likely location

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin } = useAuth(); // Fetch admin status from context

    // If the user is not an admin, redirect them
    if (!isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children; // Render the admin page if the user is an admin
};

export default AdminRoute;
