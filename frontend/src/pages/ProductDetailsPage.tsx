import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaTimes } from 'react-icons/fa';
import './ProductDetailsPage.css';
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

    // For genres, check for the property "genre"
    const genres = (movie as any).genre || (movie as any).Genres || [];

    return (
        <div className="container my-5 product-details">
            {/* Back Button (X) at the top right */}
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
                    {movie.release_year && (
                        <p>
                            <strong>Year:</strong> {movie.release_year}
                        </p>
                    )}
                    {Array.isArray(genres) && genres.length > 0 && (
                        <p>
                            <strong>Genre:</strong> {genres.join(', ')}
                        </p>
                    )}
                    {movie.director && (
                        <p>
                            <strong>Director:</strong> {movie.director}
                        </p>
                    )}
                    {movie.cast && (
                        <p>
                            <strong>Cast:</strong> {movie.cast}
                        </p>
                    )}
                    {movie.rating && (
                        <p>
                            <strong>Rating:</strong> {movie.rating}
                        </p>
                    )}
                    {movie.duration && (
                        <p>
                            <strong>Duration:</strong> {movie.duration}
                        </p>
                    )}
                    {movie.description && (
                        <p>
                            <strong>Description:</strong> {movie.description}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="btn btn-danger action-button">
                            <FaPlay /> <span>Watch Now</span>
                        </button>
                        {/* Five-star Rating Scale */}
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
