import React, { useEffect, useState } from 'react'

const AnimatedDots = () => {
    const [activeDotIndex, setActiveDotIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDotIndex((prevIndex) => (prevIndex + 1) % 4)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className="inline-flex items-center pb-[5px]">
            {[0, 1, 2].map((index) => (
                <span
                    key={index}
                    className={`
            inline-block 
            bg-dot-color 
            rounded-full 
            w-[3px]
            h-[3px]
            ml-0.5 
            transition-opacity 
            duration-300 
            ease-in-out 
            ${index < activeDotIndex ? 'opacity-100' : 'opacity-20'}
          `}
                />
            ))}
        </span>
    )
}

export default AnimatedDots;