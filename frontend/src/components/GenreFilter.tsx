import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import '../css/GenreFilter.css'; // Ensure this file includes your relevant styles

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
                    `https://localhost:5000/Movie/Genres?${selectedGenres}`,{
                        credentials: 'include'
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
                style={{ maxWidth: '100%', margin: '0 auto' }}
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

// function GenreFilter({
//     selectedGenres,
//     setSelectedGenres,
// }: {
//     selectedGenres: string[];
//     setSelectedGenres: (genres: string[]) => void;
// }) {
//     const [genres, setGenres] = useState<string[]>([]);

//     // fetch categories from the databse
//     useEffect(() => {
//         const fetchGenres = async () => {
//             try {
//                 const response = await fetch(
//                     `https://localhost:5000/Movie/Genres?${selectedGenres}`
//                 );
//                 const data = await response.json();
//                 // set categories to equal the categories fetched from the database
//                 setGenres(data);
//             } catch (error) {
//                 console.error('Error fetching categories', error);
//             }
//         };

//         fetchGenres();
//     }, []);

//     // update what categories are selected when the selection changes
//     function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
//         const updatedGenres = selectedGenres.includes(target.value)
//             ? selectedGenres.filter((x) => x !== target.value)
//             : [...selectedGenres, target.value];

//         setSelectedGenres(updatedGenres);
//     }
//     return (
//         <>
//             <h2 className="carousel-title">Filter By Genre:</h2>
//             <div className="genre-filter">
//                 <div className="genre-list">
//                     {genres.map((c) => (
//                         <div key={c} className="genre-item">
//                             <input
//                                 type="checkbox"
//                                 id={c}
//                                 value={c}
//                                 className="btn-check"
//                                 onChange={(e) => {
//                                     e.stopPropagation(); // Stop event bubbling
//                                     handleCheckboxChange(e); // Your existing handler
//                                 }}
//                             />
//                             <label
//                                 className="btn btn-filter"
//                                 htmlFor={c}
//                                 onClick={(e) => {
//                                     e.preventDefault(); // This prevents the default behavior
//                                     e.stopPropagation(); // This stops the event from bubbling up
//                                     // The click will still trigger the checkbox change due to the htmlFor attribute
//                                 }}
//                             >
//                                 {c.substring(
//                                     0,
//                                     c.indexOf(' ', 10) > 0
//                                         ? c.indexOf(' ', 10)
//                                         : c.length
//                                 )}
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default GenreFilter;
