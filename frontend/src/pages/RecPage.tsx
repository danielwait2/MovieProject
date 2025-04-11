import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
AuthorizedUser; // (comment says "delete this line below" but it won't break anything)

/* 1) Import the new MoviePage.css file here */
import '../css/MoviePage.css';

import RecMoviesForUser from '../components/RecMoviesForUser';

const RecPage = () => {
    return (
        <>
            <AuthorizeView>
                <main>
                    <div
                        style={{
                            color: '#6fc276',
                            marginLeft: '2rem',
                            marginRight: '2rem',
                            marginBottom: '2rem',
                            marginTop: '5rem', // enough to position below a Bootstrap navbar
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: '5rem',
                        }}
                    >
                        <h1 style={{ fontWeight: 'bold', fontSize: '5rem' }}>
                            Discover handpicked movies, just for you
                        </h1>
                    </div>

                    <RecMoviesForUser />
                </main>
            </AuthorizeView>
        </>
    );
};

export default RecPage;
