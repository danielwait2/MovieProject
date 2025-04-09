import { Link } from 'react-router-dom';
import Logout from './Logout';
import { AuthorizedUser } from './AuthorizeView';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
            <Link className="navbar-brand fs-3 fw-bold" to="/">
                CineNiche
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto gap-3">
                    <li className="nav-item">
                        <Link className="nav-link" to="/movies">
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            Admin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/privacyPolicy">
                            Privacy
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Log In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Logout>
                            Logout <AuthorizedUser value="email" />
                        </Logout>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
