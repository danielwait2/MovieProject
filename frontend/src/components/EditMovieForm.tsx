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
        <form onSubmit={handleSubmit} className="p-3">
            <h2 className="mb-4">Update Movie</h2>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

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

            {[
                { label: 'Director', name: 'director' },
                { label: 'Cast', name: 'cast' },
                { label: 'Country', name: 'country' },
                { label: 'Release Year', name: 'release_year', type: 'number' },
                { label: 'Rating', name: 'rating' },
                { label: 'Duration', name: 'duration' },
                { label: 'Description', name: 'description' },
            ].map(({ label, name, type = 'text' }) => (
                <div className="mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                        type={type}
                        name={name}
                        className="form-control"
                        value={formData[name as keyof Movie] as string}
                        onChange={handleChange}
                    />
                </div>
            ))}

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

            <div className="mt-4">
                <button type="submit" className="btn btn-primary me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditMovieForm;
