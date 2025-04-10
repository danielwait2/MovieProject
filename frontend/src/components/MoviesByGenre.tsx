import { useEffect, useState } from 'react';
import MovieCarousel from './MovieCarousel';
import LazyLoad from './LazyLoad';
import { baseURL } from '../api/MoviesAPI';

//delete this line below
LazyLoad;

function MoviesByGenre() {
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    //delete this line below
    setSelectedGenres;

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${baseURL}/Movie/Genres`, {
                    credentials: 'include',
                });
                const data = await response.json();

                // Check the structure of your API response
                setGenres(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setGenres([]);
            }
        };

        fetchGenres();
    }, [selectedGenres]);

    return (
        <div>
            <div>
                {genres && genres.length > 0 ? (
                    genres.map((m) => (
                        <MovieCarousel
                            key={m}
                            title={m}
                            selectedGenres={[m]}
                            rec={false}
                        />
                    ))
                ) : (
                    <div>No genres found</div>
                )}
            </div>
        </div>
    );
}
export default MoviesByGenre;
