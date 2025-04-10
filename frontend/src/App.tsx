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
import BoldToggle from './components/BoldToggle';
import { SearchProvider } from './components/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';  

function AppContent() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    const backgroundLocation =
        state?.backgroundLocation ||
        (location.pathname === '/login' || location.pathname === '/register'
            ? { pathname: '/' }
            : location);

    return (
        <>
            <style>
                {`
                    /* Bold text styling */
                    .bold-text {
                        font-weight: bold !important;
                    }

                    /* Popup overlay for session timeout notification */
                    .popup {
                        position: fixed;
                        z-index: 1000;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                    }

                    /* Popup content styling */
                    .popup-content {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        width: 90%;
                        max-width: 400px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
                        color: black;
                    }
                `}
            </style>
            <BoldToggle />
            <Navbar />
            <SessionTimeout
                onLogout={() => (window.location.href = '/login')}
            />

            {/* Render primary background routes */}
            <Routes location={backgroundLocation}>
                <Route path="/" element={<HomePage />} />
                
                <Route path="/movies" element={
                    <ProtectedRoute>
                        <MoviePage />
                    </ProtectedRoute>
                } />
                <Route path="/privacyPolicy" element={
                    <ProtectedRoute>
                        <PrivacyPolicyPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminMoviesPage />
                    </ProtectedRoute>
                } />

                <Route path="/unauthorized" element={
                    <ProtectedRoute>
                        <LoginPage />
                    </ProtectedRoute>
                } />
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
            <SearchProvider>
            <AppContent />
            </SearchProvider>
        </Router>
    );
}

export default App;
