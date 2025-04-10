import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/HomePage.css';

/**
 * DynamicBackground:
 * Renders a set of images in a fixed container with a subtle float/blur animation.
 * You can change images or adjust the animation details below.
 */
const DynamicBackground = () => {
    const [activeImages, setActiveImages] = useState<
        {
            src: string;
            id: number;
            direction: 'left' | 'right';
            top: string;
            duration: string;
            opacity: number;
            scale: number;
        }[]
    >([]);
    const imagePool = [
        'https://intex2025.blob.core.windows.net/movie-posters/Cop%20Car.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/A%20Ghost%20Story.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Last%20Resort.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/God%20Knows%20Where%20I%20Am.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Yellowbird.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Yes%20or%20No%202.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Princess%20and%20the%20Frog.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Look%20Out%20Officer.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Bad%20Boys.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Under%20the%20Bombs.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Ordinary%20People.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Planet%20Earth%20II.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Life%20as%20We%20Know%20It.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Bangkok%20Breaking.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Inception.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Matrix.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Avengers%20Infinity%20War.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Pulp%20Fiction.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Jaws.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Dick%20Johnson%20Is%20Dead.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Zoo.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/50%20First%20Dates.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Addicted%20to%20Life.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Iyore.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Hunt%20for%20the%20Wilderpeople.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Battle%20of%20Midway.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Gelo.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Little%20Switzerland.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/LEGO%20Ninjago%20Masters%20of%20Spinjitzu%20Day%20of%20the%20Departed.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Birth%20Reborn%203.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Iliza%20Shlesinger%20Confirmed%20Kills.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Sugar%20Rush.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/What%20the%20Fish.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/NOVA%20First%20Face%20of%20America.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Hart%20of%20Dixie.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Kings%20War.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Ink%20Master.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Sleepover.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Rocky.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Secret%20City.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Lion%20Pride.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Hail%20Caesar.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/Jane%20The%20Virgin.jpg',
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Death%20of%20Stalin.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const direction: 'left' | 'right' =
                Math.random() > 0.5 ? 'left' : 'right';
            const newImage = {
                src: imagePool[Math.floor(Math.random() * imagePool.length)],
                id: Date.now(),
                direction,
                top: `${Math.random() * 80 - 20}%`,
                duration: `${25 + Math.random() * 10}s`,
                opacity: 0.35 + Math.random() * 0.2,
                scale: 0.5 + Math.random() * 0.5,
            };
            setActiveImages((prev) => [...prev, newImage]);
            // Clean up old images after 30s
            setTimeout(() => {
                setActiveImages((prev) =>
                    prev.filter((img) => img.id !== newImage.id)
                );
            }, 35000);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dynamic-background">
            {activeImages.map(
                ({ src, id, direction, top, duration, opacity, scale }) => (
                    <img
                        key={id}
                        src={src}
                        className={`bg-image ${direction}`}
                        style={{
                            top,
                            animationDuration: duration,
                            opacity,
                            transform: `scale(${scale})`,
                        }}
                    />
                )
            )}
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
        'https://intex2025.blob.core.windows.net/movie-posters/Rocky.jpg',
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
        'https://intex2025.blob.core.windows.net/movie-posters/The%20Great%20British%20Baking%20Show.jpg',
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
                    alt={`Movie ${(i % images.length) + 1}`}
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
    const location = useLocation(); // Added: retrieve current location

    return (
        <div className="homepage">
            <DynamicBackground />

            {/* Hero Section */}
            <section className="hero-section">
                <h1>Unlimited movies, TV shows, and more!</h1>
                <p>Starts at $7.99! Cancel anytime.</p>
                <div className="hero-cta">
                    <button className="hero-button">
                        <Link
                            to="/login"
                            state={{ backgroundLocation: location }} // Added: pass current location
                            className="hero-link"
                        >
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
            <br />
            <br />
        </div>
    );
};

export default HomePage;
