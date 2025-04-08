import { useState, useEffect } from 'react';
import { Movie } from './types/Movie';
import MovieCarousel from './components/MovieCarousel';
import './App.css';

import './App.css';
import PrivacyPolicy from './components/PrivacyPolicy';

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
