import  { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ImageCarousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const images = Array.from({ length: 30 }, (_, i) =>
        `https://example.com/path-to-images/movie-${i + 1}.jpg`
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scrollSpeed = 1; // pixels per interval
        const intervalTime = 20; // ms per interval

        const interval = setInterval(() => {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += scrollSpeed;
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ overflowX: 'hidden', whiteSpace: 'nowrap' }}
        >
            {images.map((index) => (

                <img
                    key={index}
                    src="https://intex2025.blob.core.windows.net/movie-posters/Life%20as%20We%20Know%20It.jpg"
                    alt={`Movie ${index + 1}`}
                    style={{
                        display: 'inline-block',
                        width: '200px',
                        height: '300px',
                        objectFit: 'cover',
                        marginRight: '10px',
                    }}
                />
            ))}
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="hero-text text-white">
                    <h1 className="display-3 fw-bold">
                        Unlimited movies, TV shows, and more.
                    </h1>
                    <p className="fs-5 mt-3">Watch anywhere. Cancel anytime.</p>
                    <button className="btn btn-danger btn-lg mt-4">
                        <Link className="nav-link" to="/login">
                            Get Started
                        </Link>
                    </button>
                </div>
            </header>
            
            <section className="carousel-section my-5">
                <ImageCarousel />
            </section>
        </div>
    );
};

export default HomePage;
