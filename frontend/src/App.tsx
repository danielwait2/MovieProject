import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminMoviePage from './pages/AdminMoviesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MoviePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route
                    path="/movies/:showId"
                    element={<ProductDetailsPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route path="/admin" element={<AdminMoviePage />} />
            </Routes>
        </Router>
    );
}

export default App;
