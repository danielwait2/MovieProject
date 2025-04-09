import { useEffect, useState } from 'react';
import '../css/FeaturedMovie.css'; // Import your CSS file for styling
import { FaPlay } from 'react-icons/fa';

function FeaturedMovie() {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        // Dynamically set the image URL
        setImageUrl(`https://movieintex2backend-bkhsfxfsdnejfbe6.eastus-01.azurewebsites.net/api/MovieImages/Zion.jpg`);
    }, []);

    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover', // Ensures the image covers the entire container
                backgroundPosition: 'bottom', // Centers the image
                backgroundRepeat: 'no-repeat', // Prevents tiling
                width: '100vw', // Full width of the viewport
                height: '30vw', // Makes height responsive based on viewport width
            }}
        >
            {/* Optional content inside the hero */}
            <div className="hero-content">
                <h3>Your #1 Recommended Movie</h3>
                <h2>THE MOVIE TITLE</h2>
                <p>
                    blah blah blah description description description
                    description description
                </p>

                <button
                    className="btn btn-secondary btn-play"
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <FaPlay
                        size={16}
                        color="#FFFFFF"
                        style={{ marginRight: '10px' }}
                    />
                    Play
                </button>
            </div>
        </div>
    );
}

export default FeaturedMovie;
