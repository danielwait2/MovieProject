import { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import LazyLoad from './LazyLoad';
import Slider from 'react-slick';

function MovieCarousel({
    selectedGenres,
    title,
}: {
    selectedGenres: string[];
    title: string;
}) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef<Slider>(null);
    const accumulatedDeltaRef = useRef(0); // Accumulates wheel deltaX

    // Handle wheel events—accumulate deltaX and trigger slide change upon reaching a threshold.
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Ignore events that are predominantly vertical
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

        // Update our accumulated delta.
        accumulatedDeltaRef.current += e.deltaX;
        const threshold = 50; // Adjust this value to control sensitivity

        if (accumulatedDeltaRef.current > threshold) {
            sliderRef.current?.slickNext();
            accumulatedDeltaRef.current = 0; // Reset after triggering next
        } else if (accumulatedDeltaRef.current < -threshold) {
            sliderRef.current?.slickPrev();
            accumulatedDeltaRef.current = 0; // Reset after triggering previous
        }
    };

    // Slider settings.
    const settings = {
        dots: false,
        infinite: false, // Enable infinite looping if desired.
        speed: 450,
        slidesToShow: 6,
        slidesToScroll: 2,
        swipe: true, // Keep swipe enabled for touch devices.
        draggable: false, // Disable native mouse dragging.
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://localhost:5000/Movie/RecMoviesTemp?genres=${selectedGenres}`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenres]);

    return (
        <div className="row mb-4">
            <h2 className="carousel-title">{title}:</h2>
            <LazyLoad>
                <div
                    className="genre-carousel"
                    style={{ width: '100%', margin: '0 auto' }}
                    onWheel={handleWheel}
                >
                    <Slider ref={sliderRef} {...settings}>
                        {movies && movies.length > 0 ? (
                            movies.map((m) => (
                                <MovieCard
                                    key={m.showId}
                                    showId={m.showId}
                                    title={m.title}
                                    year={parseInt(
                                        String(m.release_year ?? '0')
                                    )}
                                />
                            ))
                        ) : (
                            <div>No movies found</div>
                        )}
                    </Slider>
                </div>
            </LazyLoad>
        </div>
    );
}

export default MovieCarousel;
