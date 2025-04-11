import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton'; // Make sure this component exists
import '../css/MovieCarousel.css'; // Make sure this file is loading correctly
import '../css/GenreFilter.css';
import LazyLoad from './LazyLoad';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import { baseURL } from '../api/MoviesAPI';

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

// Loading skeleton component for the carousel.
// It uses react-slick with similar settings as the actual slider,
// and maps over a set number of placeholder cards which use a shimmer effect.
const CarouselSkeleton: React.FC = () => {
    const skeletonSettings: Settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 10,
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

    return (
        <div className="carousel-wrapper">
            <div
                className="movie-carousel"
                style={{ width: '100%', margin: '0 auto' }}
            >
                <Slider {...skeletonSettings}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx}>
                            <MovieCardSkeleton index={idx} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

function MovieCarousel({
    selectedGenres,
    title,
    rec,
    searchTerm = '',
}: {
    selectedGenres: string[];
    title: string;
    rec: boolean;
    searchTerm?: string;
}) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchMovies = async () => {
            let url = '';
            if (!rec) {
                // Append each genre individually so that the URL includes repeated parameters.
                const params = new URLSearchParams();
                selectedGenres.forEach((genre) => {
                    params.append('genres', genre);
                });
                url = `${baseURL}/Movie/RecMoviesTemp?${params.toString()}`;
            } else {
                url = `${baseURL}/Rec/UserRec?numRecs=20`;
            }
            try {
                setLoading(true);
                const response = await fetch(url, {
                    credentials: 'include',
                });
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
    }, [selectedGenres, rec]);

    const filteredMovies = searchTerm
        ? movies.filter((movie) =>
              movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : movies;

    return (
        <div className="row mb-5" style={{ marginTop: '2%' }}>
            <h2 className="carousel-title">{title}:</h2>
            <LazyLoad>
                {loading ? (
                    // When loading is true, render the loading skeleton.
                    <CarouselSkeleton />
                ) : (
                    <div className="carousel-wrapper">
                        <div
                            className="movie-carousel"
                            style={{ width: '100%', margin: '0 auto' }}
                            onWheel={handleWheel}
                        >
                            <Slider ref={sliderRef} {...settings}>
                                {filteredMovies && filteredMovies.length > 0 ? (
                                    filteredMovies.map((m) => (
                                        <div key={m.showId}>
                                            <MovieCard
                                                showId={m.showId}
                                                title={m.title}
                                                year={parseInt(
                                                    String(
                                                        m.release_year ?? '0'
                                                    )
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
                )}
            </LazyLoad>
        </div>
    );
}

export default MovieCarousel;
