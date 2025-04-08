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
            <div className="container">
                <div className="genre-filter">
                    <div className="genre-list">
                        {genres.map((c) => (
                            <div key={c} className="genre-item">
                                <input
                                    type="checkbox"
                                    id={c}
                                    value={c}
                                    className="btn-check btn-filter"
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    className="btn"
                                    style={{ margin: '3pt', width: '120px' }}
                                    htmlFor={c}
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
            </div>
        </>
    );
}

export default GenreFilter;
