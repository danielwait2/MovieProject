import GenreFilter from '../components/GenreFilter';
import MovieCarousel from '../components/MovieCarousel';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
//delete this line below
AuthorizedUser;
import Footer from '../components/Footer';
import MoviesByGenre from '../components/MoviesByGenre';
import FeaturedMovie from '../components/FeaturedMovie';

const MoviePage = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    return (
        <>
            <AuthorizeView>
                <div className="min-h-screen bg-[#121212] text-white">
                    <main>
                        <FeaturedMovie />
                        <div className="row mb-5" style={{ marginTop: '2%' }}>
                            <MovieCarousel
                                selectedGenres={selectedGenres}
                                title="Recommended for You"
                                rec={true}
                            />
                        </div>
                        <div className="row">
                            <GenreFilter
                                selectedGenres={selectedGenres}
                                setSelectedGenres={setSelectedGenres}
                            />
                        </div>
                        <div className="row mb-5">
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
