import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import EditMovieForm from '../components/EditMovieForm';
import NewMovieForm from '../components/NewMovieForm';
import Pagination from '../components/Pagination';


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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies(
                    pageSize,
                    pageNum,
                    selectedCategories
                );
                if (data && Array.isArray(data.movies)) {
                    setMovies(data.movies);
                    setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
                } else {
                    setMovies([]);
                    setError('Failed to load movie data');
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [pageSize, pageNum, selectedCategories]);


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

<div className="row g-4">
                {movies.map((m) => (
                    <div key={m.showId} className="col-12 col-md-4">
                        <div className="card h-100 text-white bg-dark d-flex flex-column align-items-center text-center">
                            <div className="card-header w-100 d-flex justify-content-between align-items-center">
                                <h5 className="card-title text-danger fw-bold mb-0">
                                    {m.title}
                                </h5>
                                <span className="badge bg-secondary">
                                    {m.type}
                                </span>
                            </div>

                            <img
                                src={`https://localhost:5000/api/MovieImages/${m.title}.jpg`}
                                alt={m.title}
                                className="card-img-top object-fit-cover"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                onError={(e) => {
                                    e.currentTarget.src = '/assets/unknown.jpg';
                                }}
                            />

                            <div className="card-body px-3">
                                <p>
                                    <strong>Director:</strong>{' '}
                                    {m.director || 'N/A'}
                                </p>
                                <p>
                                    <strong>Cast:</strong> {m.cast || 'N/A'}
                                </p>
                                <p>
                                    <strong>Country:</strong>{' '}
                                    {m.country || 'N/A'}
                                </p>
                                <p>
                                    <strong>Year:</strong> {m.release_year}
                                </p>
                                <p>
                                    <strong>Rating:</strong> {m.rating}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {m.duration}
                                </p>
                                <p>
                                    <strong>Description:</strong>{' '}
                                    {m.description}
                                </p>
                                <p>
                                    <strong>Genres:</strong>{' '}
                                    {getGenresForMovie(m)
                                        .map(formatGenreLabel)
                                        .join(', ')}
                                </p>
                            </div>

                            <div className="card-footer w-100 d-grid gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setEditingMovie(m)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(m.showId)}
                                >
                                    Delete
                                </button>
                              
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
