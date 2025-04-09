import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaTimes } from 'react-icons/fa';
import '../css/ProductDetailsPage.css';
import unknownImage from '../assets/unknown.jpg';
import { Movie } from '../types/Movie';

const ProductDetailsPage: React.FC = () => {
    // Extract the movie identifier from the URL (your route uses "showId")
    const { showId } = useParams<{ showId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    // Local state for the user-selected rating
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://localhost:5000/Movie/Details/${showId}`,
                    { credentials: 'include' }
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

        if (showId) {
            fetchMovieDetails();
        }
    }, [showId]);

    const handleBack = () => {
        navigate('/movies');
    };

    if (loading) {
        return <div className="container my-5">Loading movie details...</div>;
    }

    if (error) {
        return <div className="container my-5">Error: {error}</div>;
    }

    if (!movie) {
        return <div className="container my-5">No movie details found.</div>;
    }

    // Build the image URL using movie.title (fallback to unknownImage)
    const imageUrl = movie.title
        ? `https://localhost:5000/api/MovieImages/${movie.title}.jpg`
        : unknownImage;

    // Retrieve genres from the movie object. (Your API may have either "genre" or "Genres")
    const genres = (movie as any).genre || (movie as any).Genres || [];

    // Process the cast string: only show the first three actors.
    // Process the cast string to show only the first three actors
    const firstThreeCast = movie.cast
        ? movie.cast.indexOf(',') > -1
            ? movie.cast
                  .split(',')
                  .slice(0, 3)
                  .map((actor) => actor.trim())
                  .join(', ')
            : (() => {
                  // If there are no commas, assume each actor's name is composed of two words.
                  const words = movie.cast.trim().split(/\s+/);
                  const actorNames: string[] = [];
                  for (let i = 0; i < words.length; i += 2) {
                      // Combine two words for one actor's name (if available)
                      const name =
                          words[i] + (words[i + 1] ? ` ${words[i + 1]}` : '');
                      actorNames.push(name);
                      if (actorNames.length === 4) break;
                  }
                  return actorNames.join(', ');
              })()
        : '';
    return (
        <div className="container my-5 product-details">
            {/* Back Button (X) */}
            <button className="back-button" onClick={handleBack}>
                <FaTimes size={24} />
            </button>
            <div className="details-wrapper row">
                {/* Left side: Movie Poster */}
                <div className="image-container col-md-4">
                    <img
                        src={imageUrl}
                        alt={movie.title}
                        onError={(e) => {
                            e.currentTarget.src = unknownImage;
                        }}
                        className="movie-detail-image img-fluid rounded shadow"
                    />
                </div>

                {/* Right side: Movie Info */}
                <div className="info-container col-md-8">
                    <h1 className="text-start mb-3">{movie.title}</h1>

                    {/* Meta Row with Year, Rating, Genre */}
                    <div className="meta-row">
                        {movie.release_year && (
                            <span className="meta-label">
                                {movie.release_year}
                            </span>
                        )}
                        {movie.rating && (
                            <span className="meta-label">{movie.rating}</span>
                        )}
                        {Array.isArray(genres) && genres.length > 0 && (
                            <span className="meta-label">
                                {genres.join(', ')}
                            </span>
                        )}
                    </div>

                    {/* Cast (only first three actors) */}
                    {movie.cast && (
                        <p className="meta-description cast-text">
                            <strong>Cast:</strong> {firstThreeCast}
                        </p>
                    )}

                    {/* Movie Description (with increased size) */}
                    {movie.description && (
                        <p className="description-text">{movie.description}</p>
                    )}

                    {/* Action Buttons and Five-Star Rating */}
                    <div className="action-buttons">
                        <button className="btn btn-danger action-button">
                            <FaPlay /> <span>Watch Now</span>
                        </button>
                        <div className="rating-scale">
                            {Array.from({ length: 5 }, (_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={ratingValue}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() =>
                                                setSelectedRating(ratingValue)
                                            }
                                            style={{ display: 'none' }}
                                        />
                                        <FaStar
                                            className="star"
                                            color={
                                                ratingValue <= selectedRating
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
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
