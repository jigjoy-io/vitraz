import React, { useEffect, useState } from "react"

export default function Reel(props: any){

    const [source, setSource] = useState(props.source)

    useEffect(() => {
        setSource(props.source)
    }, [props.source])

    return <div className="rounded-lg h-fit flex justify-center">
    <video controls playsInline autoPlay className="w-[85%] rounded-lg ">
        <source src={source} type="video/mp4"/>
        Sorry, your browser doesn't support embedded videos.
    </video>
</div>

}