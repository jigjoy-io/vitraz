import React, { useEffect, useState } from 'react';

const AnimatedDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length >= 3) return '.';
                return prevDots + '.';
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex items-center pb-[5px]">
            {[0, 1, 2].map((index) => (
                <span
                    key={index}
                    className={`
            inline-block 
            bg-dot-color 
            rounded-full 
            w-1 
            h-1 
            ml-0.5 
            transition-opacity 
            duration-300 
            ease-in-out 
            ${index < dots.length ? 'opacity-100' : 'opacity-20'}
          `}
                />
            ))}
        </span>
    );
};

export default AnimatedDots;