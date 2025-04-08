import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include', // Ensure cookies are sent
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/login');
            } else {
                console.error('Logout failed:', response.status);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button
            type="button"
            className="btn btn-outline-light logout-button"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default Logout;
