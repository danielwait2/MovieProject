import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import './MovieCarousel.css'; // Make sure this file is loading correctly
import LazyLoad from './LazyLoad';
import './MovieCarousel.css';

function MovieCarousel({
    selectedGenres,
    title,
}: {
    selectedGenres: string[];
    title: string;
}) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://localhost:5000/Movie/RecMoviesTemp?genres=${selectedGenres}`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenres]);

    return (
        <div className="carousel-wrapper">
            <h2 className="carousel-title">{title}</h2>
            <LazyLoad>
                <div className="carousel-container">
                    {loading ? (
                        <div className="carousel-placeholder">
                            <p>Loading movies...</p>
                        </div>
                    ) : (
                        <div className="movie-carousel">
                            {movies && movies.length > 0 ? (
                                movies.map((m) => (
                                    <MovieCard
                                        key={m.showId}
                                        showId={m.showId}
                                        title={m.title}
                                        year={parseInt(
                                            String(m.release_year ?? '0')
                                        )}
                                    />
                                ))
                            ) : (
                                <div>No movies found</div>
                            )}
                        </div>
                    )}
                </div>
            </LazyLoad>
        </div>
    );
}

export default MovieCarousel;
