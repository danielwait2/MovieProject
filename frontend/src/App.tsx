import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminMoviePage from './pages/AdminMoviesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MoviePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route path="/productDetails" element={<ProductDetailPage />} />
                <Route path="/admin" element={<AdminMoviePage />} />
            </Routes>
        </Router>
    );
}

export default App;
