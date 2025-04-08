import { useEffect, useRef, useState } from 'react';

interface SessionTimeoutProps {
    onLogout: () => void;
}

const SessionTimeout = ({ onLogout }: SessionTimeoutProps) => {
    const warningTimeout = 1000  * 60 * 60; // 60 mins
    const logoutTimeout = 1000  * 60 * 150; // 150 mins

    const [showWarning, setShowWarning] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (warningRef.current) {
            clearTimeout(warningRef.current);
        }

        setShowWarning(false);

        warningRef.current = setTimeout(() => setShowWarning(true), warningTimeout);
        timeoutRef.current = setTimeout(() => handleLogout(), logoutTimeout);
    };

    const handleLogout = () => {
        // Call logout endpoint
        fetch('/logout', { method: 'POST', credentials: 'include' }).then(() => {
            onLogout();
        });
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click'];
        events.forEach((event) => window.addEventListener(event, resetTimeout));
        resetTimeout();

        return () => {
            events.forEach((event) =>
                window.removeEventListener(event, resetTimeout)
            );
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (warningRef.current) {
                clearTimeout(warningRef.current);
            }
        };
    }, []);

    return (
        <>
            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-4 rounded shadow-lg">
                        You will be logged out in 1 minute due to inactivity. Move your mouse or press a key to stay logged in.
                    </div>
                </div>
            )}
        </>
    );
};

export default SessionTimeout;