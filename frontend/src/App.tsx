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
import AdminMoviePage from './pages/AdminMoviesPage';
import BoldToggle from './components/BoldToggle';
import SessionTimeout from './components/SessionTimeout';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function AppContent() {
    // Get the current location so we can check if there’s a background route
    const location = useLocation();
    // If this state property is set, it means we navigated here
    // via a link that provided state for the background location.
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Navbar />
            <SessionTimeout
                onLogout={() => (window.location.href = '/login')}
            />
            {/* Main routes (background or full page) */}
            <Routes location={state?.backgroundLocation || location}>

                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route path="/admin" element={<AdminMoviePage />} />
            </Routes>
            {/* Modal routes rendered on top of the background */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/movies/:showId"
                        element={<ProductDetailsPage />}
                    />
                </Routes>
            )}
            <BoldToggle />
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
