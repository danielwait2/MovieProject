import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import { AuthorizedUser } from './AuthorizeView';
import  { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { baseURL } from '../api/MoviesAPI';
import '../css/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        fetchWithRetry(`${baseURL}/pingauth`, { method: 'GET', credentials: 'include' })
            .then(data => {
                if (data.email) {
                    setIsLoggedIn(true);
                    Cookies.set('auth', 'true');
                } else {
                    setIsLoggedIn(false);
                    Cookies.remove('auth');
                }
            })
            .catch(error => {
                console.error('Error pinging auth:', error);
                setIsLoggedIn(false);
                Cookies.remove('auth');
            });
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
            <Link className="navbar-brand brand-green" to="/">
                CINENICHE
            </Link>

            <button
                className="navbar-toggler custom-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto gap-3">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link custom-nav-link" to="/movies">
                                    Movies
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Logout className="nav-link custom-nav-link">
                                    Logout <AuthorizedUser value="email" />
                                </Logout>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link custom-nav-link" to="/register">
                                    Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link custom-nav-link" to="/login">
                                    Log In
                                </Link>
                            </li>
                        </>
                    )}
            
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

function fetchWithRetry(url: string, options: RequestInit, retries: number = 3, delay: number = 1000): Promise<any> {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            if (retries > 0) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(fetchWithRetry(url, options, retries - 1, delay));
                    }, delay);
                });
            } else {
                throw error;
            }
        });
}