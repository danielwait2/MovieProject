import { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import LazyLoad from './LazyLoad';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/MovieCarousel.css';

/**
 * A "steeper angle" right arrow using an SVG path.
 * Feel free to tweak the path commands for a different shape.
 */
function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-next-arrow" onClick={onClick}>
            <svg viewBox="0 0 24 24">
                {/* This path draws a right-pointing chevron. 
                    M4 2 -> move to (4,2)
                    l12 10 -> line 12 right, 10 down
                    -12 10 -> line 12 left, 10 down (back to x=4)
                */}
                <path d="M4 2 l12 10 -12 10" />
            </svg>
        </div>
    );
}

/**
 * A matching left arrow (mirror image).
 */
function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
            <svg viewBox="0 0 24 24">
                {/* This path draws a left-pointing chevron.
                    M20 2 -> move to (20,2)
                    l-12 10 -> line 12 left, 10 down
                    12 10 -> line 12 right, 10 down (back to x=20)
                */}
                <path d="M20 2 l-12 10 12 10" />
            </svg>
        </div>
    );
}

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
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 450,
        slidesToShow: 5,
        slidesToScroll: 2,
        swipe: true,
        draggable: false,
        variableWidth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
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
                    className="movie-carousel"
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
