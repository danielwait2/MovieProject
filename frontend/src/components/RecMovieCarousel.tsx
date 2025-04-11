import { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import '../css/GenreFilter.css';

import LazyLoad from './LazyLoad';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import { baseURL, fetchContentRecs } from '../api/MoviesAPI';

function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-next-arrow" onClick={onClick}>
            <svg viewBox="0 0 24 24">
                <path d="M4 2 l12 10 -12 10" />
            </svg>
        </div>
    );
}
function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
            <svg viewBox="0 0 24 24">
                <path d="M20 2 l-12 10 12 10" />
            </svg>
        </div>
    );
}

interface RecMovieCarouselProps {
    movie: Movie;
}

const RecMovieCarousel: React.FC<RecMovieCarouselProps> = ({ movie }) => {
    const [loading, setLoading] = useState(true);
    loading;
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
        infinite: false,
        speed: 800,
        slidesToShow: 5.8,
        slidesToScroll: 1,
        swipe: true,
        draggable: false,
        variableWidth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        centerMode: false,
        initialSlide: 0,

        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const [recs, setRecs] = useState<Movie[]>([]);
    const [error, setError] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {
            const loadRecs = async () => {
                try {
                    const response = await fetchContentRecs(movie.showId);
                    setRecs(response);
                } catch (err: any) {
                    setError(err.message || 'Error fetching recommendations.');
                }
            };

            loadRecs();
        };

        fetchMovies();
    }, []);

    return (
        <div className="row mb-5" style={{ marginTop: '2%' }}>
            <h2 className="carousel-title">
                {`Because you liked ${movie.title}`}:
            </h2>
            <LazyLoad>
                <div className="carousel-wrapper">
                    <div
                        className="movie-carousel"
                        style={{ width: '100%', margin: '0 auto' }}
                        onWheel={handleWheel}
                    >
                        <Slider ref={sliderRef} {...settings}>
                            {recs && recs.length > 0 ? (
                                recs.map((r) => (
                                    <div key={r.showId}>
                                        <MovieCard
                                            showId={r.showId}
                                            title={r.title}
                                            year={parseInt(
                                                String(r.release_year ?? '0')
                                            )}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>No movies found</div>
                            )}
                        </Slider>
                    </div>
                </div>
            </LazyLoad>
        </div>
    );
};

export default RecMovieCarousel;
