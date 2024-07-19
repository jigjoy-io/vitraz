import React, { useEffect, useRef, useState } from "react"

export default function Reel(props: any){

    const [source, setSource] = useState(props.source)
    const videoRef = useRef(null as any)

    useEffect(() => {
        setSource(props.source)
        videoRef.current?.load()
    }, [props.source])

    return <div className="rounded-lg h-fit flex justify-center">
    <video ref={videoRef} controls playsInline autoPlay className="rounded-lg">
        <source src={source} type="video/mp4"/>
        Sorry, your browser doesn't support embedded videos.
    </video>
</div>

}