import GenreFilter from '../components/GenreFilter';
import MovieCarousel from '../components/MovieCarousel';

const MoviePage = () => {
    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <header className="p-6 border-b border-gray-800"></header>
            <main>
                <div className="row mb-5">
                    <MovieCarousel />
                </div>
                <div className="row">
                    <GenreFilter />
                </div>
            </main>
        </div>
    );
};

export default MoviePage;
