import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import unknownImage from '../assets/unknown.jpg';

interface MovieCardProps {
    showId: string; // Unique identifier for the movie
    title: string;
    year: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ showId, title, year }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        setImageUrl(`https://localhost:5000/api/MovieImages/${title}.jpg`);
    }, [title]);

    return (
        <Link to={`/movies/${showId}`}>
            <div className="movie-card">
                <div className="movie-image-placeholder">
                    <img
                        className="movie-image"
                        src={imageUrl || unknownImage}
                        alt={title}
                        onError={(e) => {
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
