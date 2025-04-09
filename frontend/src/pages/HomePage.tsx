import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * DynamicBackground:
 * Renders a set of images in a fixed container with a subtle float/blur animation.
 * You can change images or adjust the animation details below.
 */
const DynamicBackground = () => {
    const images = [
        'https://intex2025.blob.core.windows.net/movie-posters/Life%20as%20We%20Know%20It.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Bangkok%20Breaking.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Inception.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Matrix.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Avengers%20Infinity%20War.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Pulp%20Fiction.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Jaws.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Dick%20Johnson%20Is%20Dead.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Zoo.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Barbie%20Dolphin%20Magic.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/A%20Wrinkle%20in%20Time.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Bachelorette.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Bachelor.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Good%20Place.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Great%20British%20Baking%20Show.jpg'
    ];

    return (
        <div className="dynamic-background">
            {images.map((src, index) => {
                const top = Math.random() * 80;  // random vertical position (consistent for this image)
                const duration = 20 + Math.random() * 20; // random duration between 20s and 40s
                const randomProgress = Math.random() * duration; // negative delay for starting mid-animation
                const style = {
                    top: `${top}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `-${randomProgress}s`,
                };
                return <img key={index} src={src} style={style} alt="" />;
            })}
        </div>
    );
};

/**
 * ImageCarousel:
 * A horizontally scrolling row of placeholder images representing various movies.
 * (Could be replaced by a real carousel later.)
 */
const ImageCarousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const images = [
        'https://intex2025.blob.core.windows.net/movie-posters/Life%20as%20We%20Know%20It.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Bangkok%20Breaking.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Inception.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Matrix.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Avengers%20Infinity%20War.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Pulp%20Fiction.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Jaws.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Dick%20Johnson%20Is%20Dead.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Zoo.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Barbie%20Dolphin%20Magic.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/A%20Wrinkle%20in%20Time.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Bachelorette.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Bachelor.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Good%20Place.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Great%20British%20Baking%20Show.jpg'
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scrollSpeed = 1; // pixels per interval
        const intervalTime = 20; // ms per interval

        const interval = setInterval(() => {
            // When scrollLeft reaches half the total scroll width (the duplicated content),
            // reset it to 0 to create a seamless loop.
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += scrollSpeed;
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    const allImages = [...images, ...images];
    return (
        <div className="carousel-container" ref={containerRef}>
            {allImages.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Movie ${i % images.length + 1}`}
                    className="carousel-image"
                />
            ))}
        </div>
    );
};

/**
 * HomePage:
 * Main landing page structure, with:
 *   - A nav bar at the top (logo/sign-in)
 *   - The dynamic background behind everything
 *   - A hero section with a big call-to-action
 *   - A horizontally-scrolling movie carousel
 */
const HomePage = () => {
    return (
        <div className="homepage">
            <DynamicBackground />

            {/* Hero Section */}
            <section className="hero-section">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <p>Starts at $7.99. Cancel anytime.</p>
                <div className="hero-cta">
                    <button className="hero-button">
                        <Link to="/login" className="hero-link">
                            Get Started
                        </Link>
                    </button>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="carousel-section">
                <h2>Trending Now</h2>
                <ImageCarousel />
            </section>

            {/* Footer (Optional) */}
            <footer className="main-footer">
                <p>© 2025 CineNiche. All rights reserved.</p>
            </footer>

            {/* NEW STYLES - No Bootstrap, entirely custom */}
            <style>
                {`
          /* General Resets */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body, html, #root {
            height: 100%;
            background-color: #000;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #fff;
          }
          a {
            text-decoration: none;
            color: inherit;
          }

          /* HomePage container */
          .homepage {
            padding-top: 200px; /* Space for the fixed navbar */
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
            background-color: transparent;
            z-index: 1;
          }

          /* Dynamic Background */
          .dynamic-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background: transparent;
            overflow: hidden;
          }
          .dynamic-background img {
            position: absolute;
            max-width: 250px;
            opacity: 0.4;
            filter: none;
            animation: slideLeft linear infinite;
          }
          @keyframes slideLeft {
            0% {
              left: 110%;
            }
            100% {
              left: -250px;
            }
          }

          /* Main Header */
          .main-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            position: absolute;
            top: 0;
            width: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0));
          }
          .logo {
            font-size: 1.75rem;
            font-weight: 700;
            color: #e50914;
          }
          .nav-right {
            display: flex;
            gap: 1rem;
          }
          .nav-link {
            font-size: 1rem;
            font-weight: 500;
            color: #fff;
            transition: color 0.2s;
          }
          .nav-link:hover {
            color: #e50914;
          }

          /* Hero Section */
          .hero-section {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 1rem; /* Adjusted to place the hero content near the top */
            padding: 2rem;
          }
          .hero-section h1 {
            font-size: 3rem;
            max-width: 700px;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .hero-section p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
          }
          .hero-cta {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-button {
            padding: 0.75rem 1.5rem;
            background-color: #e50914;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.125rem;
            font-weight: 600;
            color: #fff;
            transition: background-color 0.3s ease;
          }
          .hero-button:hover {
            background-color: #f40612;
          }
          .hero-link {
            color: inherit;
          }

          /* Carousel Section */
          .carousel-section {
            position: relative;
            z-index: 999;
            margin-top: 4rem;
            padding: 0 2rem;
          }
          .carousel-section h2 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            font-weight: 600;
          }
          .carousel-container {
            overflow-x: hidden;
            white-space: nowrap;
            position: relative;
          }
          .carousel-image {
            display: inline-block;
            width: 180px;
            height: 270px;
            object-fit: cover;
            margin-right: 8px;
            border-radius: 4px;
          }

          /* Footer */
          .main-footer {
            text-align: center;
            padding: 1.5rem 0;
            margin-top: 3rem;
            opacity: 0.7;
          }
          .main-footer p {
            font-size: 0.9rem;
          }
        `}
            </style>
        </div>
    );
};

export default HomePage;
