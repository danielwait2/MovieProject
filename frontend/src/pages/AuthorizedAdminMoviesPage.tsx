import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import EditMovieForm from '../components/EditMovieForm';
import NewMovieForm from '../components/NewMovieForm';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AuthorizeView from '../components/AuthorizeView';
import '../css/AdminMoviesPage.css';

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
//delete this line below
getGenresForMovie;

const formatGenreLabel = (key: string): string =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
//delete this line below
formatGenreLabel;

const AuthorizedAdminMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(8);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    //delete this line below
    setSelectedCategories;

    // New: State for searchQuery that will be updated when Enter is pressed.
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Pass searchQuery along with pageSize, pageNum, and selectedCategories
                const data = await fetchMovies(
                    pageSize,
                    pageNum,
                    searchQuery,
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
    }, [pageSize, pageNum, searchQuery, selectedCategories]);

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

    const toggleGenre = (genre: string) => {
        setSelectedCategories((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    };

    if (loading) return <p>Loading movies ...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <AuthorizeView>
                <div>
                    <div className="text-center mb-3">
                        <h1 className="mb-0">Admin - Movies</h1>
                    </div>
                    <div className="d-flex justify-content-end px-3 mb-4">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#6fc276',
                                color: 'white',
                            }}
                            onClick={() => setShowForm(true)}
                        >
                            Add Movie
                        </button>
                    </div>

                    {/* Add Movie Modal */}
                    {showForm && (
                        <div
                            className="modal d-block"
                            role="dialog"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                            <div
                                className="modal-dialog modal-lg"
                                role="document"
                            >
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            Add New Movie
                                        </h5>
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
                                                fetchMovies(
                                                    pageSize,
                                                    pageNum,
                                                    searchQuery,
                                                    selectedCategories
                                                ).then((data) =>
                                                    setMovies(data.movies)
                                                );
                                            }}
                                            onCancel={() => setShowForm(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Movie Modal */}
                    {editingMovie && (
                        <div
                            className="modal d-block"
                            role="dialog"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                            <div
                                className="modal-dialog modal-lg"
                                role="document"
                            >
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            Edit Movie
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() =>
                                                setEditingMovie(null)
                                            }
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <EditMovieForm
                                            movie={editingMovie}
                                            onSuccess={() => {
                                                setEditingMovie(null);
                                                fetchMovies(
                                                    pageSize,
                                                    pageNum,
                                                    searchQuery,
                                                    selectedCategories
                                                ).then((data) =>
                                                    setMovies(data.movies)
                                                );
                                            }}
                                            onCancel={() =>
                                                setEditingMovie(null)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="container">
                        <div className="row">
                            {/* Sidebar: Filter options */}
                            <div className="col-lg-2 mb-4">
                                {/* Search Bar placed above the filter categories */}
                                <div className="mb-3">
                                    <SearchBar
                                        onSearch={(query) => {
                                            setSearchQuery(query);
                                            // Reset the page when performing a new search
                                            setPageNum(1);
                                        }}
                                        placeholder="Search by title..."
                                    />
                                </div>
                                <h5 className="mb-3">Filter by Genre</h5>
                                {selectedCategories.length > 0 && (
                                    <button
                                        className="btn btn-sm btn-outline-secondary mb-3"
                                        onClick={() =>
                                            setSelectedCategories([])
                                        }
                                    >
                                        Clear Filters
                                    </button>
                                )}
                                {genreFields.map((genre) => (
                                    <div className="form-check" key={genre}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`filter-${genre}`}
                                            name={genre}
                                            checked={selectedCategories.includes(
                                                genre
                                            )}
                                            onChange={() => toggleGenre(genre)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`filter-${genre}`}
                                        >
                                            {formatGenreLabel(genre)}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Movie Cards */}
                            <div className="col-12 col-lg-10">
                                <div className="row g-4">
                                    {movies.map((m) => (
                                        <div
                                            key={m.showId}
                                            className="col-6 col-md-4 col-lg-3"
                                        >
                                            <div className="card h-100 text-white bg-dark d-flex flex-column text-center">
                                                <div className="card-header w-100 d-flex justify-content-between align-items-center">
                                                    <h5
                                                        className="card-title fw-bold mb-0 text-truncate w-100"
                                                        style={{
                                                            color: '#6fc276',
                                                        }}
                                                    >
                                                        {m.title}
                                                    </h5>
                                                </div>

                                                <img
                                                    src={`https://intex2025.blob.core.windows.net/movie-posters/${m.title.replace(/[^a-zA-Z0-9 ]/g, '')}.jpg`}
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

                                                <div className="card-footer w-100 d-grid gap-2 mt-auto">
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            backgroundColor:
                                                                '#6fc276',
                                                            color: 'white',
                                                        }}
                                                        onClick={() =>
                                                            setEditingMovie(m)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                m.showId
                                                            )
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

                    <div className="d-flex justify-content-center mt-4">
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
                </div>
            </AuthorizeView>
        </>
    );
};

export default AuthorizedAdminMoviePage;
