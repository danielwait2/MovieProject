import { useState } from 'react';
import { addMovie } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

interface NewMovieFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

type MovieFormData = Movie;

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

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
    const [formData, setFormData] = useState<MovieFormData>({
        showId: '',
        title: '',
        type: '',
        director: '',
        cast: '',
        country: '',
        release_year: 0,
        rating: '',
        duration: '',
        description: '',
        action: 0,
        adventure: 0,
        animeSeriesInternationalTvShows: 0,
        britishTvShowsDocuseriesInternationalTvShows: 0,
        children: 0,
        comedies: 0,
        comediesDramasInternationalMovies: 0,
        comediesInternationalMovies: 0,
        comediesRomanticMovies: 0,
        crimeTvShowsDocuseries: 0,
        documentaries: 0,
        documentariesInternationalMovies: 0,
        docuseries: 0,
        dramas: 0,
        dramasInternationalMovies: 0,
        dramasRomanticMovies: 0,
        familyMovies: 0,
        fantasy: 0,
        horrorMovies: 0,
        internationalMoviesThrillers: 0,
        internationalTvShowsRomanticTvShows: 0,
        kidsTV: 0,
        languageTvShows: 0,
        musicals: 0,
        natureTv: 0,
        realityTv: 0,
        spirituality: 0,
        tvAction: 0,
        tvComedies: 0,
        tvDramas: 0,
        talkShowsTvComedies: 0,
        thrillers: 0,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, type, value, checked } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked ? 1 : 0 });
        } else if (type === 'number') {
            setFormData({
                ...formData,
                [name]: Number(value),
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const movieToSend = formData;
            console.log('Submitting movie...', movieToSend);
            await addMovie(movieToSend);
            onSuccess();
        } catch (err) {
            console.error('Add movie failed:', err);
            alert('Failed to add movie. See console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h2 className="mb-4">Add Movie</h2>

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
                        value={
                            formData[name as keyof MovieFormData]?.toString() ??
                            ''
                        }
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div className="mb-3">
                <label className="form-label d-block">Genres</label>
                <div className="row">
                    {genreFields.map((genre) => (
                        <div className="form-check col-md-6" key={genre}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={genre}
                                name={genre}
                                checked={
                                    formData[genre as keyof MovieFormData] === 1
                                }
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
                    Add
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

export default NewMovieForm;
