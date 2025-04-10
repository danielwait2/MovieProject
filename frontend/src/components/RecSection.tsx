import { useEffect, useRef, useState } from 'react';
import { fetchContentRecs } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import LazyLoad from './LazyLoad';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import '../css/GenreFilter.css';
import MovieCardSmall from './MovieCardSmall';

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

interface RecSectionProps {
    title: string;
}

function RecSection({ title }: RecSectionProps) {
    const [recs, setRecs] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
                const recommended = await fetchContentRecs(title);
                console.log(recommended);
                setRecs(recommended);
            } catch (err: any) {
                setError(err.message || 'Error fetching recommendations.');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    if (loading) return <div>Loading recommendations...</div>;
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
                                    <div>
                                        <MovieCardSmall
                                            key={m.showId}
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
