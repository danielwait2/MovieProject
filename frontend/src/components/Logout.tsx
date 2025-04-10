import { useNavigate } from 'react-router-dom';
import {baseURL} from '../api/MoviesAPI';


function Logout(props: { children: React.ReactNode; className?: string }) {
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
            className={'nav-link custom-nav-link'}
            href="#"
            onClick={handleLogout}
        >
            {props.children}
        </a>
    );
}

export default Logout;
