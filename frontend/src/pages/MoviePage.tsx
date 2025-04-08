import MovieCarousel from '../components/MovieCarousel';

const MoviePage = () => {
    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <header className="p-6 border-b border-gray-800">
                <h1 className="text-3xl font-bold">Movies</h1>
            </header>
            <main>
                <MovieCarousel />
            </main>
        </div>
    );
};

export default MoviePage;
