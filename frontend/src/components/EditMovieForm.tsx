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

// Helper function to replace potential null values with defaults
const sanitizeMovie = (movie: Movie): Movie => ({
    ...movie,
    title: movie.title ?? '',
    director: movie.director ?? '',
    cast: movie.cast ?? '',
    country: movie.country ?? '',
    release_year: movie.release_year ?? 0,
    rating: movie.rating ?? '',
    duration: movie.duration ?? '',
    description: movie.description ?? '',
    type: movie.type ?? 'Movie',
    // For genre/flag fields, we default to 0 if not provided
    action: movie.action ?? 0,
    adventure: movie.adventure ?? 0,
    animeSeriesInternationalTvShows: movie.animeSeriesInternationalTvShows ?? 0,
    britishTvShowsDocuseriesInternationalTvShows:
        movie.britishTvShowsDocuseriesInternationalTvShows ?? 0,
    children: movie.children ?? 0,
    comedies: movie.comedies ?? 0,
    comediesDramasInternationalMovies:
        movie.comediesDramasInternationalMovies ?? 0,
    comediesInternationalMovies: movie.comediesInternationalMovies ?? 0,
    comediesRomanticMovies: movie.comediesRomanticMovies ?? 0,
    crimeTvShowsDocuseries: movie.crimeTvShowsDocuseries ?? 0,
    documentaries: movie.documentaries ?? 0,
    documentariesInternationalMovies:
        movie.documentariesInternationalMovies ?? 0,
    docuseries: movie.docuseries ?? 0,
    dramas: movie.dramas ?? 0,
    dramasInternationalMovies: movie.dramasInternationalMovies ?? 0,
    dramasRomanticMovies: movie.dramasRomanticMovies ?? 0,
    familyMovies: movie.familyMovies ?? 0,
    fantasy: movie.fantasy ?? 0,
    horrorMovies: movie.horrorMovies ?? 0,
    internationalMoviesThrillers: movie.internationalMoviesThrillers ?? 0,
    internationalTvShowsRomanticTvShows:
        movie.internationalTvShowsRomanticTvShows ?? 0,
    kidsTV: movie.kidsTV ?? 0,
    languageTvShows: movie.languageTvShows ?? 0,
    musicals: movie.musicals ?? 0,
    natureTv: movie.natureTv ?? 0,
    realityTv: movie.realityTv ?? 0,
    spirituality: movie.spirituality ?? 0,
    tvAction: movie.tvAction ?? 0,
    tvComedies: movie.tvComedies ?? 0,
    tvDramas: movie.tvDramas ?? 0,
    talkShowsTvComedies: movie.talkShowsTvComedies ?? 0,
    thrillers: movie.thrillers ?? 0,
});

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
    const [formData, setFormData] = useState<Movie>(sanitizeMovie(movie));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked ? 1 : 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Helper function to build the Genres array from the genre flag fields
    const getSelectedGenres = (data: Movie) => {
        return genreFields
            .filter((genre) => data[genre as keyof Movie] === 1)
            .map((genre) =>
                // Format the genre string similar to your label: add space before uppercase and capitalize first letter.
                genre
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^\w/, (c) => c.toUpperCase())
                    .trim()
            );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add the Genres array to the payload
        const updatedPayload = {
            ...formData,
            Genres: getSelectedGenres(formData),
        };
        await updateMovie(formData.showId, updatedPayload);
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
                <button
                    type="submit"
                    className="btn"
                    style={{
                        backgroundColor: '#6fc276',
                        color: 'white',
                    }}
                >
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
