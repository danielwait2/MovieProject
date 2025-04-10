import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/MovieCardSmall.css';
import unknownImage from '../assets/unknown.jpg';

interface MovieCardProps {
    showId: string; // Unique identifier for the movie
    title: string;
    style?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ showId, title }) => {
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
            <div className="movie-card-small">
                <div className="movie-image-placeholder-small">
                    <img
                        className="movie-image-small"
                        src={imageUrl || unknownImage}
                        alt={title}
                        onError={(e) => {
                            e.currentTarget.src = unknownImage;
                        }}
                    />
                </div>
                <div className="movie-info-small">
                    <h3 className="movie-title-small">{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
