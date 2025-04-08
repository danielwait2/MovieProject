import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import './MovieCarousel.css'; // We'll create this CSS file

function MovieCarousel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://localhost:5000/Movie/RecMoviesTemp`,{
                        credentials: 'include'
                      }
                );
                const data = await response.json();

                // Check the structure of your API response
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading movies...</div>;
    }

    return (
        <div>
            <h2 className="carousel-title">Recommended For You:</h2>
            <div className="carousel-container">
                <div className="movie-carousel">
                    {movies && movies.length > 0 ? (
                        movies.map((m) => (
                            <MovieCard
                                key={m.showId}
                                title={m.title}
                                year={parseInt(String(m.release_year ?? '0'))}
                            />
                        ))
                    ) : (
                        <div>No movies found</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCarousel;
