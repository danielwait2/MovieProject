import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/Pagination';
import EditMovieForm from '../components/EditMovieForm';
import NewMovieForm from '../components/NewMovieForm';

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

const getGenresForMovie = (movie: Movie): string[] => {
    return genreFields.filter((field) => movie[field as keyof Movie] === 1);
};

const formatGenreLabel = (key: string): string =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

const AdminMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies(pageSize, pageNum, []);
                if (data && Array.isArray(data.movies)) {
                    setMovies(data.movies);
                    setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
                } else {
                    setMovies([]); // fallback to empty array
                    setError('Failed to load movie data');
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, [pageSize, pageNum]);

    const handleDelete = async (showId: string) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this movie?'
        );
        if (!confirmDelete) return;

        try {
            await deleteMovie(showId);
            setMovies(movies.filter((m) => m.showId !== showId));
        } catch (error) {
            alert('Failed to delete movie. Please try again.');
        }
    };

    if (loading) return <p>Loading movies ...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1>Admin - Movies</h1>

            {!showForm && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add Movie
                </button>
            )}

            {showForm && (
                <NewMovieForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchMovies(pageSize, pageNum, []).then((data) =>
                            setMovies(data.movies)
                        );
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingMovie && (
                <EditMovieForm
                    movie={editingMovie}
                    onSuccess={() => {
                        setEditingMovie(null);
                        fetchMovies(pageSize, pageNum, []).then((data) =>
                            setMovies(data.movies)
                        );
                    }}
                    onCancel={() => setEditingMovie(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Director</th>
                        <th>Cast</th>
                        <th>Country</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Genre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.showId}>
                            <td>{m.showId}</td>
                            <td>{m.title}</td>
                            <td>{m.type}</td>
                            <td>{m.director}</td>
                            <td>{m.cast}</td>
                            <td>{m.country}</td>
                            <td>{m.release_year}</td>
                            <td>{m.rating}</td>
                            <td>{m.duration}</td>
                            <td>{m.description}</td>
                            <td>{m.type}</td>
                            <td>
                                {getGenresForMovie(m)
                                    .map(formatGenreLabel)
                                    .join(', ')}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm w-100 mb-1"
                                    onClick={() => setEditingMovie(m)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm w-100 mb-1"
                                    onClick={() => handleDelete(m.showId)}
                                >
                                    Delete
                                </button>
                                A
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminMoviePage;
