import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminMoviePage from './pages/AdminMoviesPage';
import BoldToggle from './components/BoldToggle';
import SessionTimeout from './components/SessionTimeout';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <SessionTimeout
                onLogout={() => (window.location.href = '/login')}
            />{' '}
            {/* 👈 add this */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route path="/productDetails" element={<ProductDetailPage />} />
                <Route path="/admin" element={<AdminMoviePage />} />
            </Routes>
            <BoldToggle />
        </Router>
    );
}

export default App;
