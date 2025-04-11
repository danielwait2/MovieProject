import { useEffect, useState } from 'react';
import '../css/FeaturedMovie.css'; // Import your CSS file for styling
import { FaPlay } from 'react-icons/fa';
import { baseURL } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

function FeaturedMovie() {
    const [topMovie, setTopMovie] = useState<Movie | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchTopMovie = async () => {
            const response = await fetch(
                `${baseURL}/Rec/UserRecMain?numRecs=1`,
                {
                    credentials: 'include', // Include this if you're using cookies for auth
                }
            );
            const data = await response.json();
            setTopMovie(data[0]); // Assuming the first movie is the top recommendation
        };
        fetchTopMovie();
    }, []);

    useEffect(() => {
        if (topMovie) {
            const title = topMovie.title;
            console.log('Top Movie:', title); // Debugging line to check the title
            const sanitizedTitle = title.replace(/[^a-zA-Z0-9 ]/g, '');
            const encodedTitle = encodeURIComponent(sanitizedTitle);

            setImageUrl(
                `https://intex2025.blob.core.windows.net/movie-posters/${encodedTitle}.jpg`
            );
        }
    }, [topMovie]);

    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${imageUrl} )`,
                backgroundSize: 'cover', // Ensures the image covers the entire container
                backgroundPosition: 'bottom', // Centers the image
                backgroundRepeat: 'no-repeat', // Prevents tiling
                width: '100vw', // Full width of the viewport
                height: '30vw', // Makes height responsive based on viewport width
            }}
        >
            {/* Optional content inside the hero */}
            <div className="hero-content">
                <h3>Your #1 Recommended Movie</h3>
                {topMovie && <h2>{topMovie.title}</h2>}
                <p>
                    {topMovie?.description ||
                        'No description available for this movie.'}
                </p>

                <button
                    className="btn btn-secondary btn-play"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: isHovered ? '#6fc276' : undefined,
                        color: isHovered ? '#6fc276' : undefined,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <FaPlay
                        size={16}
                        color={isHovered ? '#6fc276' : '#FFFFFF'}
                        style={{ marginRight: '10px' }}
                    />
                    Play
                </button>
            </div>
        </div>
    );
}

export default FeaturedMovie;
