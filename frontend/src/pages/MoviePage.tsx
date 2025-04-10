import MovieCarousel from '../components/MovieCarousel';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
AuthorizedUser; // (comment says "delete this line below" but it won't break anything)
import MoviesByGenre from '../components/MoviesByGenre';
import FeaturedMovie from '../components/FeaturedMovie';
import { useSearch } from '../components/SearchContext';

/* 1) Import the new MoviePage.css file here */
import '../css/MoviePage.css';

const MoviePage = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const { searchTerm } = useSearch();
    setSelectedGenres;

    return (
        <AuthorizeView>
            {/* 2) Replace your old Tailwind or inline styles with our new "movie-page" class */}
            <div className="movie-page">
                <main>
                    {/* If you want the featured movie spaced like Netflix, wrap it in a custom class */}
                    <div className="featured-movie">
                        <FeaturedMovie />
                    </div>

                    {searchTerm && (
                        <div>
                            <MovieCarousel
                                selectedGenres={selectedGenres}
                                title="Search Results"
                                rec={false}
                                searchTerm={searchTerm}
                            />
                        </div>
                    )}
                    <div>
                        <MovieCarousel
                            selectedGenres={selectedGenres}
                            title="Recommended for You"
                            rec={true}
                        />
                    </div>
                    <div className="row mb-5">
                        <MoviesByGenre />
                    </div>
                </main>
            </div>
            <br />
            <br />
        </AuthorizeView>
    );
};

export default MoviePage;
