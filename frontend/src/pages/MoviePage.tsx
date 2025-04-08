import GenreFilter from '../components/GenreFilter';
import MovieCarousel from '../components/MovieCarousel';
import { useState } from 'react';

// add this for login logout and authorize view
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const MoviePage = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    return (
        <>
            <Navbar />
            <AuthorizeView>
                <span>
                    <Logout>
                        Logout <AuthorizedUser value="email" />
                    </Logout>
                </span>
                <div className="min-h-screen bg-[#121212] text-white">
                    <header className="p-6 border-b border-gray-800">
                        <h1 className="text-3xl font-bold">Movies</h1>
                    </header>
                    <main>
                        <div className="row mb-5">
                            <MovieCarousel />
                        </div>
                        <div className="row">
                            <GenreFilter
                                selectedGenres={selectedGenres}
                                setSelectedGenres={setSelectedGenres}
                            />
                        </div>
                    </main>
                </div>
                <br />
                <br />
                <Footer />
            </AuthorizeView>
        </>
    );
};

export default MoviePage;
