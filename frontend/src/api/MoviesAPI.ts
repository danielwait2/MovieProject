import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
    movies: Movie[];
}

const API_URL = `https://localhost:5000/Movie`;



export const fetchMovies = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
    try {
        const categoryParams = selectedCategories
            .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
            .join('&');

        const response = await fetch(
            `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
            {
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching movies: ', error);
        throw error;
    }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/AddMovie`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        });

        if (!response.ok) {
            throw new Error('Failed to add movie');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding movie: ', error);
        // Rethrow the error to be handled by the caller
        throw error;
    }
};

export const updateMovie = async (
    show_id: number,
    updatedMovie: Movie
): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/UpdateProject/${show_id}`, {
            method: 'PUT', // Use PUT for updating a resource
            credentials: 'include', // Include credentials for session management
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(updatedMovie), // Convert the updated project to JSON
        });

        return await response.json(); // Parse the JSON response
    } catch (error) {
        console.error('Error updating movie: ', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const deleteMovie = async (show_id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
            method: 'DELETE', // Use DELETE for removing a resource
            credentials: 'include', // Include credentials for session management
        });

        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
    } catch (error) {
        // Handle the error appropriately
        console.error('Error deleting movie: ', error);

        throw error;
    }
};