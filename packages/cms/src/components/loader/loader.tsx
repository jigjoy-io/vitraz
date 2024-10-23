import React from 'react'
import Spinner from "./spinner"
import AnimatedDots from "./animated-dots"

const Loader = (props: any) => {
    return (
        <>
            <div className="w-full h-[50px]"><Spinner /></div>
            <div className="py-2 flex flex-row justify-center items-end">
                <div>{props.message}</div><AnimatedDots />
            </div>
        </>
    )
}

export default Loader