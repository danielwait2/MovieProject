import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import {baseURL} from '../api/MoviesAPI';

const UserContext = createContext<User | null>(null);

interface User {
    email: string;
    roles: string[];
}

function AuthorizeViewAdmin(props: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // add a loading state
    const emptyUser: User = { email: '', roles: [] };
    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        async function checkAuthorization() {
            try {
                // First, check if the user is authenticated via /pingauth
                const authResponse = await fetch(`${baseURL}/pingauth`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const authContentType = authResponse.headers.get('content-type');
                if (!authContentType || !authContentType.includes('application/json')) {
                    throw new Error('Invalid auth response format');
                }
                const authData = await authResponse.json();
                console.log('Auth response data:', authData);

                if (authData.email) {
                    const email = authData.email;
                    console.log('Authenticated email:', email);

                    // Now retrieve user roles from /Role/GetUserRoles
                    const rolesResponse = await fetch(`${baseURL}/Role/GetUserRoles?userEmail=${encodeURIComponent(email)}`, {
                        method: 'GET',
                        credentials: 'include'
                    });

                    // Log the response status for debugging
                    console.log('Roles response status:', rolesResponse.status);

                    if (!rolesResponse.ok) {
                        const errorText = await rolesResponse.text();
                        console.error('Roles endpoint returned error text:', errorText);
                        throw new Error('Roles endpoint returned error: ' + rolesResponse.status);
                    }

                    const rolesContentType = rolesResponse.headers.get('content-type');
                    if (!rolesContentType || !rolesContentType.includes('application/json')) {
                        console.error('Roles response content type:', rolesContentType);
                        throw new Error('Invalid roles response format');
                    }

                    const rolesData = await rolesResponse.json();
                    console.log('Roles response data:', rolesData);

                    // Validate that rolesData.roles includes "Admin"
                    if (Array.isArray(rolesData.roles) && rolesData.roles.includes("Admin")) {
                        console.log('User has Admin role.');
                        setUser({ email, roles: rolesData.roles });
                        setAuthorized(true);
                    } else {
                        console.error('User is not authorized as Admin. Received roles:', rolesData.roles);
                        throw new Error('User is not authorized as Admin');
                    }
                } else {
                    throw new Error('User is not authenticated');
                }
            } catch (error) {
                console.error('Authorization error:', error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuthorization();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (authorized) {
        return (
            <UserContext.Provider value={user}>
                {props.children}
            </UserContext.Provider>
        );
    }

    return <Navigate to="/" />;
}

export function AuthorizedUser(props: { value: string }) {
    const user = React.useContext(UserContext);

    if (!user) return null; // Prevents errors if context is null

    return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeViewAdmin;
