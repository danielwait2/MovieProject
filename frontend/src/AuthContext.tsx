import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

// Define the shape of the authentication data
interface AuthContextType {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState(false); // Manage admin status

    // Fetch admin status from API when the app loads
    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                const response = await fetch('/api/account/is-admin', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsAdmin(data.isAdmin); // Set admin status
                } else {
                    console.error('Failed to fetch admin status');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAdminStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
