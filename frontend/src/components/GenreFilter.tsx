import { useEffect, useState } from 'react';
import './GenreFilter.css';

function GenreFilter({
    selectedGenres,
    setSelectedGenres,
}: {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
}) {
    const [genres, setGenres] = useState<string[]>([]);

    // fetch categories from the databse
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://localhost:5000/Movie/Genres?${selectedGenres}`
                );
                const data = await response.json();
                // set categories to equal the categories fetched from the database
                setGenres(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchGenres();
    }, []);

    // update what categories are selected when the selection changes
    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedGenres = selectedGenres.includes(target.value)
            ? selectedGenres.filter((x) => x !== target.value)
            : [...selectedGenres, target.value];

        setSelectedGenres(updatedGenres);
    }
    return (
        <>
            <h2 className="carousel-title">Filter By Genre:</h2>
            <div className="genre-filter">
                <div className="genre-list">
                    {genres.map((c) => (
                        <div key={c} className="genre-item">
                            <input
                                type="checkbox"
                                id={c}
                                value={c}
                                className="btn-check"
                                onChange={(e) => {
                                    e.stopPropagation(); // Stop event bubbling
                                    handleCheckboxChange(e); // Your existing handler
                                }}
                            />
                            <label
                                className="btn btn-filter"
                                htmlFor={c}
                                onClick={(e) => {
                                    e.preventDefault(); // This prevents the default behavior
                                    e.stopPropagation(); // This stops the event from bubbling up
                                    // The click will still trigger the checkbox change due to the htmlFor attribute
                                }}
                            >
                                {c.substring(
                                    0,
                                    c.indexOf(' ', 10) > 0
                                        ? c.indexOf(' ', 10)
                                        : c.length
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default GenreFilter;
