import { useState } from 'react';
import { updateMovie } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

interface EditMovieFormProps {
    movie: Movie;
    onSuccess: () => void;
    onCancel: () => void;
}

const genreFields = [
    'action',
    'adventure',
    'animeSeriesInternationalTvShows',
    'britishTvShowsDocuseriesInternationalTvShows',
    'children',
    'comedies',
    'comediesDramasInternationalMovies',
    'comediesInternationalMovies',
    'comediesRomanticMovies',
    'crimeTvShowsDocuseries',
    'documentaries',
    'documentariesInternationalMovies',
    'docuseries',
    'dramas',
    'dramasInternationalMovies',
    'dramasRomanticMovies',
    'familyMovies',
    'fantasy',
    'horrorMovies',
    'internationalMoviesThrillers',
    'internationalTvShowsRomanticTvShows',
    'kidsTV',
    'languageTvShows',
    'musicals',
    'natureTv',
    'realityTv',
    'spirituality',
    'tvAction',
    'tvComedies',
    'tvDramas',
    'talkShowsTvComedies',
    'thrillers',
];

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
    const [formData, setFormData] = useState<Movie>({ ...movie });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked ? 1 : 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateMovie(formData.showId, formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Movie</h2>
            <label>Movie Title:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <div className="mb-3">
                <label className="form-label d-block">Type</label>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="movie"
                        value="Movie"
                        checked={formData.type === 'Movie'}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="movie">
                        Movie
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="tvshow"
                        value="Tv Show"
                        checked={formData.type === 'Tv Show'}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="tvshow">
                        TV Show
                    </label>
                </div>
            </div>
            <label>Director</label>
            <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
            />
            <label>Cast</label>
            <input
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
            />
            <label>Country</label>
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
            />
            <label>Release Year</label>
            <input
                type="number"
                name="release_year"
                value={formData.release_year}
                onChange={handleChange}
            />
            <label>Rating</label>
            <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
            />
            <label>Duration</label>
            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
            />
            <label>Description</label>
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <div className="mb-3 mt-4">
                <label className="form-label d-block">Genres</label>
                <div className="row">
                    {genreFields.map((genre) => (
                        <div className="form-check col-md-6" key={genre}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={genre}
                                name={genre}
                                checked={formData[genre as keyof Movie] === 1}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={genre}>
                                {genre
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^\w/, (c) => c.toUpperCase())}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
                Save
            </button>
            <button
                type="button"
                className="btn btn-secondary mt-3 ms-2"
                onClick={onCancel}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditMovieForm;
