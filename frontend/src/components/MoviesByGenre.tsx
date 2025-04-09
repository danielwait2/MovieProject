import { useEffect, useState } from 'react';
import MovieCarousel from './MovieCarousel';
import LazyLoad from './LazyLoad';

function MoviesByGenre() {
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://movieintex2backend-bkhsfxfsdnejfbe6.eastus-01.azurewebsites.net/Movie/Genres`,
                    {
                        credentials: 'include',
                    }
                );
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
                        <MovieCarousel title={m} selectedGenres={[m]} />
                    ))
                ) : (
                    <div>No genres found</div>
                )}
            </div>
        </div>
    );
}
export default MoviesByGenre;
