import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './AuthContext'; // Your AuthProvider component
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App'; // Your main application component

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
