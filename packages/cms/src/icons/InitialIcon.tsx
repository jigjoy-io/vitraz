import React from "react"

export const InitialIcon = ({ initials }) => {
    return (
        <div
            className='rounded-md h-[32px] w-[32px] flex items-center bg-primary justify-center'>
            <p className="flex justify-center items-center text-white text-paragraph">{initials}</p>
        </div>
    )
}