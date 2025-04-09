import GenreFilter from '../components/GenreFilter';
import MovieCarousel from '../components/MovieCarousel';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Footer from '../components/Footer';
import MoviesByGenre from '../components/MoviesByGenre';

const MoviePage = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    return (
        <>
            <AuthorizeView>
                <div className="min-h-screen bg-[#121212] text-white">
                    <header className="p-6 border-b border-gray-800">
                        <h1 className="text-3xl font-bold">Movies</h1>
                    </header>
                    <main>
                        <div className="row mb-5">
                            <MovieCarousel
                                selectedGenres={selectedGenres}
                                title="Recommended for You:"
                            />
                        </div>
                        <div className="row">
                            <GenreFilter
                                selectedGenres={selectedGenres}
                                setSelectedGenres={setSelectedGenres}
                            />
                        </div>
                        <div className="row">
                            <MoviesByGenre />
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
