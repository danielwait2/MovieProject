import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import './GenreFilter.css'; // Ensure this file includes your relevant styles

function GenreFilter({
    selectedGenres,
    setSelectedGenres,
}: {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
}) {
    const [genres, setGenres] = useState<string[]>([]);
    const sliderRef = useRef<Slider>(null);
    const accumulatedDeltaRef = useRef(0); // Accumulates wheel deltaX

    // Fetch genres from the database on mount
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://localhost:5000/Movie/Genres?${selectedGenres}`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchGenres();
    }, []); // If selectedGenres may change externally, include it in the dependency array

    // Update selected genres when a checkbox is toggled.
    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedGenres = selectedGenres.includes(target.value)
            ? selectedGenres.filter((x) => x !== target.value)
            : [...selectedGenres, target.value];

        setSelectedGenres(updatedGenres);
    }

    // Handle wheel events—accumulate deltaX and trigger slide change immediately upon reaching a threshold.
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

    return (
        <div>
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
}

export default GenreFilter;
