import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ToRecBtn = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <button
                className="btn btn-secondary btn-play"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: isHovered ? '#6fc276' : undefined,
                    color: isHovered ? '#6fc276' : undefined,
                    position: 'absolute',
                    top: '60%', // adjust as necessary
                    right: '3%', // adjust as necessary
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate('/recs')}
            >
                More Recommended For You
            </button>
        </>
    );
};

export default ToRecBtn;
