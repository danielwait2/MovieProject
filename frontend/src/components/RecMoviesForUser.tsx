import { useEffect, useState } from 'react';
import { fetchLikedMovies } from '../api/MoviesAPI';
import RecMovieCarousel from './RecMovieCarousel';
import { Movie } from '../types/Movie';

// A simple loading skeleton component for your carousel placeholder.
const LoadingSkeleton = () => {
    return (
        <div className="loading-skeleton">
            {/* Repeat the skeleton structure a few times to mimic multiple carousels */}
            {[...Array(3)].map((_, carouselIndex) => (
                <div
                    key={carouselIndex}
                    className="skeleton-carousel"
                    style={{ marginBottom: '2rem' }}
                >
                    {/* Skeleton header for the carousel title */}
                    <div
                        className="skeleton-header"
                        style={{
                            width: '30%',
                            height: '2rem',
                            marginBottom: '1rem',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                        }}
                    />
                    {/* Skeleton cards as placeholders for movies */}
                    <div
                        className="skeleton-cards"
                        style={{ display: 'flex', gap: '1rem' }}
                    >
                        {[...Array(5)].map((_, cardIndex) => (
                            <div
                                key={cardIndex}
                                className="skeleton-card"
                                style={{
                                    width: '8rem',
                                    height: '12rem',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '4px',
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

function RecMoviesForUser() {
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadLikedMovies = async () => {
            try {
                const response = await fetchLikedMovies();
                setLikedMovies(response);
            } catch (err: any) {
                setError(err.message || 'Error fetching recommendations.');
            } finally {
                setLoading(false);
            }
        };

        loadLikedMovies();
    }, []);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="movies-by-genre-container">
            <div className="genre-carousels">
                {likedMovies.map((m, index) => (
                    <RecMovieCarousel key={index} movie={m} />
                ))}
            </div>
        </div>
    );
}

export default RecMoviesForUser;
