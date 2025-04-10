import AuthorizeView from '../components/AuthorizeView';
import AuthorizedAdminMoviesPage from './AuthorizedAdminMoviesPage';

const AdminMoviePage = () => {
    return (
        <AuthorizeView>
            <AuthorizedAdminMoviesPage />
        </AuthorizeView>
    );
};

export default AdminMoviePage;
