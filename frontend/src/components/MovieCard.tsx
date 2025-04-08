import React, { useEffect, useState } from 'react';
import './MovieCard.css'; // We'll define styles in this file
import unknownImage from '../assets/unknown.jpg';

interface MovieCardProps {
    key: string;
    title: string;
    year: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ key, title, year }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        // Set the URL to your API endpoint
        setImageUrl(`https://localhost:5000/api/MovieImages/${title}.jpg`);
    }, [title]);

    return (
        <div key={key} className="movie-card">
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
    );
};

export default MovieCard;
