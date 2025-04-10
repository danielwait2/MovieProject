import AuthorizeViewAdmin from '../components/AuthorizeViewAdmin';
import AuthorizedAdminMoviesPage from './AuthorizedAdminMoviesPage';

const AdminMoviePage = () => {
    return (
        <AuthorizeViewAdmin>
            <AuthorizedAdminMoviesPage />
        </AuthorizeViewAdmin>
    );
};

export default AdminMoviePage;
