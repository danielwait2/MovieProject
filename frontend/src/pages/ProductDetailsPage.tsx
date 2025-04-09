import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaTimes } from 'react-icons/fa';
import '../css/ProductDetailsPage.css';
import unknownImage from '../assets/unknown.jpg';
import { Movie } from '../types/Movie';
import { baseURL } from '../api/MoviesAPI';

const ProductDetailsPage: React.FC = () => {
    const { showId } = useParams<{ showId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${baseURL}/Movie/Details/${showId}`,
                    {
                        credentials: 'include',
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data: Movie = await response.json();
                setMovie(data);
            } catch (err: any) {
                setError(err.message || 'Error fetching movie details');
            } finally {
                setLoading(false);
            }
        };
        if (showId) fetchMovieDetails();
    }, [showId]);

    if (loading) return <div>Loading movie details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>No movie details found.</div>;

    // Build the poster URL (this was working fine for you):
    const posterUrl = movie.title
        ? `https://intex2025.blob.core.windows.net/movie-posters/${movie.title.replace(/[^a-zA-Z0-9 ]/g, '')}.jpg`
        : unknownImage;

    // Limit the cast string to only show the first three actors
    const firstThreeCast = movie.cast
        ? movie.cast.indexOf(',') > -1
            ? movie.cast
                  .split(',')
                  .slice(0, 3)
                  .map((actor) => actor.trim())
                  .join(', ')
            : (() => {
                  // If there are no commas, assume each actor name is made of two words
                  const words = movie.cast.trim().split(/\s+/);
                  const actorNames: string[] = [];
                  for (let i = 0; i < words.length; i += 2) {
                      const name =
                          words[i] + (words[i + 1] ? ` ${words[i + 1]}` : '');
                      actorNames.push(name);
                      if (actorNames.length === 3) break;
                  }
                  return actorNames.join(', ');
              })()
        : '';

    // If your API has these fields (unchanged)
    const genres = (movie as any).genre || (movie as any).Genres || [];

    // Back button
    const handleBack = () => navigate('/movies');

    return (
        <div className="product-details">
            {/* 1) The narrower wrapper, centered on page */}
            <div className="hero-wrapper">
                {/* 2) The hero background (fill .hero-wrapper) */}
                <div
                    className="hero"
                    style={{ backgroundImage: `url(${posterUrl})` }}
                >
                    {/* The X in top-right corner */}
                    <button className="back-button" onClick={handleBack}>
                        <FaTimes size={24} />
                    </button>
                    {/* 3) Centered content inside .hero */}
                    <div className="centered-content">
                        <h1>{movie.title}</h1>

                        <div className="meta-row">
                            {movie.release_year && (
                                <span className="meta-label">
                                    {movie.release_year}
                                </span>
                            )}
                            {movie.rating && (
                                <span className="meta-label">
                                    {movie.rating}
                                </span>
                            )}
                            {genres.length > 0 && (
                                <span className="meta-label">
                                    {genres.join(', ')}
                                </span>
                            )}
                        </div>

                        {/* Now displaying the *limited* cast */}
                        {movie.cast && (
                            <p className="cast-text">
                                <strong>Cast:</strong> {firstThreeCast}
                            </p>
                        )}

                        {movie.description && (
                            <p className="description-text">
                                {movie.description}
                            </p>
                        )}

                        <div className="action-buttons">
                            <button className="btn btn-danger action-button">
                                <FaPlay /> <span>Play</span>
                            </button>
                            <div className="rating-scale">
                                {Array.from({ length: 5 }, (_, i) => {
                                    const ratingVal = i + 1;
                                    return (
                                        <label key={ratingVal}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingVal}
                                                style={{ display: 'none' }}
                                                onClick={() =>
                                                    setSelectedRating(ratingVal)
                                                }
                                            />
                                            <FaStar
                                                className="star"
                                                color={
                                                    ratingVal <= selectedRating
                                                        ? '#ffc107'
                                                        : '#e4e5e9'
                                                }
                                                size={24}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>{' '}
                    {/* centered-content */}
                </div>{' '}
                {/* hero */}
            </div>{' '}
            {/* hero-wrapper */}
        </div>
    );
};

export default ProductDetailsPage;
