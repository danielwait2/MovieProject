import { useEffect, useRef, useState } from 'react';
import { fetchContentRecs } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import LazyLoad from './LazyLoad';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import '../css/GenreFilter.css';
import MovieCardSmall from './MovieCardSmall';

// Existing arrow components.
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

// Skeleton component for a small movie card
const MovieCardSmallSkeleton = ({ index }: { index: number }) => {
    const delay = `${index * 0.2}s`;
    return (
        <div className="movie-card-small skeleton-card">
            <div
                className="movie-image-placeholder skeleton"
                style={{
                    width: '100%',
                    height: '10rem', // Adjust as needed
                    animationDelay: delay,
                }}
            ></div>
            <div className="movie-info">
                <div
                    className="skeleton"
                    style={{
                        width: '70%',
                        height: '1rem',
                        margin: '0.5rem 0',
                        animationDelay: delay,
                    }}
                ></div>
            </div>
        </div>
    );
};

// Carousel skeleton using react-slick settings similar to the main slider.
const CarouselSkeleton = () => {
    const skeletonSettings: Settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5.8,
        slidesToScroll: 1,
        swipe: false,
        draggable: false,
        variableWidth: true,
        centerMode: false,
        initialSlide: 0,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    // Adjust the number of skeleton cards (here 6 placeholders are rendered)
    return (
        <div className="carousel-wrapper">
            <div
                className="movie-carousel"
                style={{ width: '100%', margin: '0 auto' }}
            >
                <Slider {...skeletonSettings}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx}>
                            <MovieCardSmallSkeleton index={idx} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

interface RecSectionProps {
    movieId: string;
}

function RecSection({ movieId }: RecSectionProps) {
    const [recs, setRecs] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const sliderRef = useRef<Slider>(null);
    const accumulatedDeltaRef = useRef(0); // Accumulates wheel deltaX

    // Handle wheel events—accumulate deltaX and trigger slide change upon reaching a threshold.
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Ignore events that are predominantly vertical.
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        accumulatedDeltaRef.current += e.deltaX;
        const threshold = 50; // Adjust sensitivity as needed
        if (accumulatedDeltaRef.current > threshold) {
            sliderRef.current?.slickNext();
            accumulatedDeltaRef.current = 0;
        } else if (accumulatedDeltaRef.current < -threshold) {
            sliderRef.current?.slickPrev();
            accumulatedDeltaRef.current = 0;
        }
    };

    // Slider settings.
    const settings: Settings = {
        dots: false,
        infinite: true,
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

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                setLoading(true);
                const recommended = await fetchContentRecs(movieId);
                console.log(recommended);
                setRecs(recommended);
            } catch (err: any) {
                setError(err.message || 'Error fetching recommendations.');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [movieId]);

    if (loading) {
        return (
            <div style={{ marginTop: '2%' }}>
                <LazyLoad>
                    {/* Render the dynamic carousel skeleton while loading */}
                    <CarouselSkeleton />
                </LazyLoad>
            </div>
        );
    }
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ marginTop: '2%' }}>
            <LazyLoad>
                <div>
                    <div
                        style={{ width: '100%', margin: '0 auto' }}
                        onWheel={handleWheel}
                    >
                        <Slider ref={sliderRef} {...settings}>
                            {recs && recs.length > 0 ? (
                                recs.map((m) => (
                                    <div key={m.showId}>
                                        <MovieCardSmall
                                            showId={m.showId}
                                            title={m.title}
                                            style={'movie-card-small'}
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
}

export default RecSection;
