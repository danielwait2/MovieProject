import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SessionTimeout from './components/SessionTimeout';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from 'react-cookie-consent';
import AdminMoviesPage from './pages/AdminMoviesPage';

function AppContent() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    // If no background is provided and the current URL is /login or /register,
    // force the background to be the homepage.
    const backgroundLocation =
        state?.backgroundLocation ||
        (location.pathname === '/login' || location.pathname === '/register'
            ? { pathname: '/' }
            : location);

    return (
        <>
            <Navbar />
            <SessionTimeout
                onLogout={() => (window.location.href = '/login')}
            />

            {/* Render primary background routes */}
            <Routes location={backgroundLocation}>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route
                    path="/admin"
                    element={
                            <AdminMoviesPage />
                    }
                />

                <Route path="/unauthorized" element={<LoginPage />} />
            </Routes>

            {/* Render the login and register modals over the background */}
            {(location.pathname === '/login' ||
                location.pathname === '/register') && (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            )}

            {/* Render additional modal routes (e.g., product details) if background state exists */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/movies/:showId"
                        element={<ProductDetailsPage />}
                    />
                </Routes>
            )}

            <footer className="text-center mt-auto">
                <CookieConsent>
                    This website uses cookies to enhance the user experience.
                </CookieConsent>
            </footer>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
