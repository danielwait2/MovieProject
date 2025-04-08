import { ReactNode, useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
    children: ReactNode;
}

function LazyLoad({ children }: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('LazyLoad element is now visible'); // Log visibility

                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            { threshold: 1 } // Adjust threshold as needed
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        // Clean up the observer on unmount
        return () => observer.disconnect();
    }, []);

    return <div ref={ref}>{isVisible ? children : null}</div>;
}

export default LazyLoad;
