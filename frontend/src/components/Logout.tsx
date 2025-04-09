import { useNavigate } from 'react-router-dom';
import {baseURL} from '../api/MoviesAPI';


function Logout(props: { children: React.ReactNode }) {
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/logout`, {
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
        <a
            type="button"
            className="btn btn-outline-light logout-button"
            href="#"
            onClick={handleLogout}
        >
            {props.children}
        </a>
    );
}

export default Logout;
