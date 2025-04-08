import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <main>
                <MovieCarousel />
            </main>
            <PrivacyPolicy />
        </div>
    );
}

export default App;
