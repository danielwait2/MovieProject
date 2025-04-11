import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/MovieCard.css';
import unknownImage from '../assets/unknown.jpg';

interface MovieCardProps {
    showId: string; // Unique identifier for the movie
    title: string;
    year: number;
    style?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ showId, title, year }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9 ]/g, '');
        setImageUrl(
            `https://intex2025.blob.core.windows.net/movie-posters/${sanitizedTitle}.jpg`
        );
    }, [title]);

    return (
        <Link
            to={`/movies/${showId}`}
            state={{ backgroundLocation: location }} // pass current location as state
            style={{ textDecoration: 'none' }}
        >
            <div className="movie-card">
                <div className="movie-image-placeholder">
                    <img
                        className="movie-image"
                        src={imageUrl || unknownImage}
                        alt={title}
                        onError={(e) => {
                            e.currentTarget.onerror = null; // Prevent endless loops

                            e.currentTarget.src = unknownImage;
                        }}
                    />
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{title}</h3>
                    <p className="movie-year">{year}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
