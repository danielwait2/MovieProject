// import { useEffect, useState } from 'react';
// import MovieCarousel from './MovieCarousel';
// import LazyLoad from './LazyLoad';
// import { baseURL } from '../api/MoviesAPI';

// //delete this line below
// LazyLoad;

// function MoviesByGenre() {
//     const [genres, setGenres] = useState<string[]>([]);
//     const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

//     useEffect(() => {
//         const fetchGenres = async () => {
//             try {
//                 const response = await fetch(`${baseURL}/Movie/Genres`, {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();

//                 // Check the structure of your API response
//                 setGenres(data);
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//                 setGenres([]);
//             }
//         };

//         fetchGenres();
//     }, [selectedGenres]);

//     return (
//         <div>
//             <div>
//                 {genres && genres.length > 0 ? (
//                     genres.map((m) => (
//                         <MovieCarousel
//                             key={m}
//                             title={m}
//                             selectedGenres={[m]}
//                             rec={false}
//                         />
//                     ))
//                 ) : (
//                     <div>No genres found</div>
//                 )}
//             </div>
//         </div>
//     );
// }
// export default MoviesByGenre;

import { useEffect, useState } from 'react';
import MovieCarousel from './MovieCarousel';
import GenreFilter from './GenreFilter';
import { baseURL } from '../api/MoviesAPI';

function MoviesByGenre() {
    const [allGenres, setAllGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all available genres when component mounts
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseURL}/Movie/Genres`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setAllGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setAllGenres([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    // Determine which genres to display
    const genresToDisplay =
        selectedGenres.length > 0 ? selectedGenres : allGenres;

    return (
        <div className="movies-by-genre-container">
            {/* Use your existing GenreFilter component */}
            <GenreFilter
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />

            {loading ? (
                <div className="loading">Loading genres...</div>
            ) : (
                <div className="genre-carousels">
                    {genresToDisplay.map((genre) => (
                        <MovieCarousel
                            key={genre}
                            title={genre}
                            selectedGenres={[genre]}
                            rec={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MoviesByGenre;
