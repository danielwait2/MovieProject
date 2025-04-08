import MovieCarousel from '../components/MovieCarousel';

// add this for login logout and authorize view
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
const MoviePage = () => {
    return (
        <>
        <AuthorizeView>
            <span>
                <Logout>
                    Logout <AuthorizedUser value="email"/>
                </Logout>
            </span>
            <div className="min-h-screen bg-[#121212] text-white">
                <header className="p-6 border-b border-gray-800">
                    <h1 className="text-3xl font-bold">Movies</h1>
                </header>
                <main>
                    <MovieCarousel />
                </main>
            </div>
        </AuthorizeView>
        </>
    );
};

export default MoviePage;
