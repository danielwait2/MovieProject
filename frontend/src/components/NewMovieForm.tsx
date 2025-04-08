import { useState } from 'react';
import { addMovie } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

interface NewMovieFormProps {
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

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
    const [formData, setFormData] = useState<Movie>({
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
        await addMovie(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Movie</h2>
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

            <button type="submit" className="btn btn-primary mt-3">
                Add
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

export default NewMovieForm;
