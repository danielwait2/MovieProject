import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
    movies: Movie[];
    totalNumMovies: number;
}
// export const baseURL = 'https://movieintex2backend-bkhsfxfsdnejfbe6.eastus-01.azurewebsites.net';

export const baseURL = 'https://localhost:5000';

const API_URL = `${baseURL}/Movie`;

export const fetchMovies = async (
    pageSize: number,
    pageNum: number,
    searchQuery: string,
    selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
    try {
        const queryParams = new URLSearchParams({
            pageSize: pageSize.toString(),
            pageNum: pageNum.toString(),
            searchQuery,
        });

        selectedCategories.forEach((cat) => {
            queryParams.append('projectTypes', cat);
        });

        const response = await fetch(
            `${API_URL}/AllMovies?${queryParams.toString()}`,
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
        const response = await fetch(`${API_URL}/Movie/AddMovie`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        });

        const text = await response.text();
        console.log('AddMovie response status:', response.status);
        console.log('AddMovie response body:', text);

        if (!response.ok) {
            throw new Error(`Failed to add movie: ${text}`);
        }

        return JSON.parse(text);
    } catch (error) {
        console.error('Error adding movie: ', error);
        throw error;
    }
};

export const updateMovie = async (
    show_id: string,
    updatedMovie: Movie
): Promise<Movie | void> => {
    try {
        const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server responded with error:', errorText);
            throw new Error('Failed to update movie');
        }

        // Only parse JSON if there's a body
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return; // No content expected
    } catch (error) {
        console.error('Error updating movie: ', error);
        throw error;
    }
};

export const deleteMovie = async (show_id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
    } catch (error) {
        console.error('Error deleting movie: ', error);
        throw error;
    }
};
