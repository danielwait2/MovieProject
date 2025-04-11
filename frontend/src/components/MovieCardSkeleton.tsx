import React from 'react';
import '../css/MovieCard.css';

interface MovieCardSkeletonProps {
    index: number;
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({ index }) => {
    // Use the index to stagger the animation delay for a dynamic effect
    const delay = `${index * 0.2}s`;

    return (
        <div className="movie-card skeleton-card">
            <div
                className="movie-image-placeholder skeleton"
                style={{
                    width: '100%',
                    height: '15rem',
                    animationDelay: delay,
                }}
            />
            <div className="movie-info">
                <div
                    className="movie-title skeleton"
                    style={{
                        width: '80%',
                        height: '1.5rem',
                        marginBottom: '0.5rem',
                        animationDelay: delay,
                    }}
                />
                <div
                    className="movie-year skeleton"
                    style={{
                        width: '40%',
                        height: '1rem',
                        animationDelay: delay,
                    }}
                />
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
