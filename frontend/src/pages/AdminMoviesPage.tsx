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

            {showForm && (
                <div
                    className="modal d-block"
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Movie</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <NewMovieForm
                                    onSuccess={() => {
                                        setShowForm(false);
                                        fetchMovies(pageSize, pageNum, []).then(
                                            (data) => setMovies(data.movies)
                                        );
                                    }}
                                    onCancel={() => setShowForm(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editingMovie && (
                <div
                    className="modal d-block"
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Movie</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEditingMovie(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <EditMovieForm
                                    movie={editingMovie}
                                    onSuccess={() => {
                                        setEditingMovie(null);
                                        fetchMovies(pageSize, pageNum, []).then(
                                            (data) => setMovies(data.movies)
                                        );
                                    }}
                                    onCancel={() => setEditingMovie(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div> {/* Left margin */}
                    <div className="col-12 col-lg-10">
                        <div className="row g-4">
                            {movies.map((m) => (
                                <div key={m.showId} className="col-12 col-md-4">
                                    <div className="card h-100 text-white bg-dark d-flex flex-column text-center">
                                        {/* Title */}
                                        <div className="card-header w-100 d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-danger fw-bold mb-0 text-truncate w-100">
                                                {m.title}
                                            </h5>
                                        </div>

                                        {/* Poster Image */}
                                        <img
                                            src={`https://intex2025.blob.core.windows.net/movie-posters/${m.title}.jpg`}
                                            alt={m.title}
                                            className="card-img-top"
                                            style={{
                                                maxHeight: '100%',
                                                objectFit: 'cover',
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    '/assets/unknown.jpg';
                                            }}
                                        />

                                        {/* Edit/Delete Buttons */}
                                        <div className="card-footer w-100 d-grid gap-2 mt-auto">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    setEditingMovie(m)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(m.showId)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
