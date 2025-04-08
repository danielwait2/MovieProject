import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import  CreateAccountPage  from './pages/CreateAccountPage';
import ProductDetailPage from './pages/ProductDetailPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MoviePage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/createAccount' element={<CreateAccountPage/>} />
                <Route path='/privacyPolicy' element={<PrivacyPolicyPage/>} />
                <Route path='/productDetails' element={<ProductDetailPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
