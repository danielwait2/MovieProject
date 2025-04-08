import { useState, useEffect } from 'react';
import { Movie } from './types/Movie';
import MovieCarousel from './components/MovieCarousel'; 
import './App.css';

import './App.css';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <header className="p-6 border-b border-gray-800">
                <h1 className="text-3xl font-bold">Movies</h1>
            </header>
            <main>
                <MovieCarousel />
            </main>
            <PrivacyPolicy />

        </div>
    );
}

export default App;
