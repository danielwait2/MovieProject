import React from 'react';
import './MovieCard.css'; // We'll define styles in this file

interface MovieCardProps {
  key: string;
  title: string;
  year: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ key, title, year }) => {
  return (
    <div key={key} className="movie-card">
      <div className="movie-image-placeholder"></div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
