import React, { useEffect, useState, useRef } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import '../css/GenreFilter.css';

type GenreFilterProps = {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
};

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

const GenreFilter: React.FC<GenreFilterProps> = ({
    selectedGenres,
    setSelectedGenres,
}) => {
    const [genres, setGenres] = useState<string[]>([]);
    const sliderRef = useRef<Slider>(null);
    const accumulatedDeltaRef = useRef(0);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://movieintex2backend-bkhsfxfsdnejfbe6.eastus-01.azurewebsites.net/Movie/Genres?${selectedGenres}`,
                    {
                        credentials: 'include',
                    }
                );
                const data: string[] = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres', error);
            }
        };
        fetchGenres();
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const updated = selectedGenres.includes(value)
            ? selectedGenres.filter((x) => x !== value)
            : [...selectedGenres, value];
        setSelectedGenres(updated);
    };

    // Horizontal scroll on the wheel moves the slider
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        accumulatedDeltaRef.current += e.deltaX;
        const threshold = 50;
        if (accumulatedDeltaRef.current > threshold) {
            sliderRef.current?.slickNext();
            accumulatedDeltaRef.current = 0;
        } else if (accumulatedDeltaRef.current < -threshold) {
            sliderRef.current?.slickPrev();
            accumulatedDeltaRef.current = 0;
        }
    };

    // Use our custom arrows with steeper angle SVGs
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 450,
        slidesToShow: 6,
        slidesToScroll: 2,
        swipe: true,
        draggable: false,
        variableWidth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        centerMode: true, // Enables space on the edges,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="genre-filter">
            <h2 className="carousel-title">Filter By Genre:</h2>
            <div
                className="genre-carousel"
                style={{ width: '100%', margin: '0 auto' }}
                onWheel={handleWheel}
            >
                <Slider ref={sliderRef} {...settings}>
                    {genres.map((c) => (
                        <div key={c} className="genre-item">
                            <input
                                type="checkbox"
                                id={c}
                                value={c}
                                className="btn-check"
                                onChange={handleCheckboxChange}
                                checked={selectedGenres.includes(c)}
                            />
                            <label className="btn btn-filter" htmlFor={c}>
                                {c.substring(
                                    0,
                                    c.indexOf(' ', 15) > 0
                                        ? c.indexOf(' ', 15)
                                        : c.length
                                )}
                            </label>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default GenreFilter;
