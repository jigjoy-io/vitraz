import React, { useEffect, useRef, useState } from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../util/store"
import VideoPlayer from "./video-player"
import Player from "../../util/player"
import MediaLibrary from "../../util/media-library"

let localization = new LocalizedStrings({
    US: {
        videoNotSupported: "Sorry, your browser doesn't support embedded videos."
    },
    RS: {
        videoNotSupported: 'Oprostite, vaš pretraživač ne podržava linkovane snimke.'
    }
})
export default function Reel(props: any) {

    const [source, setSource] = useState(props.source)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const lang = useLanguage()
    const mediaLibrary = MediaLibrary.getInstance()

    let params = {
        id: props.id,
        video: videoRef.current,
        onStart: () => {},
        onEnd: () => {}
    }

    const videoPlayer: Player = new VideoPlayer(params)
    mediaLibrary.addPlayer(videoPlayer)

    useEffect(() => {
        localization.setLanguage(lang)

        return () => mediaLibrary.removePlayer(videoPlayer)
    }, [])

    useEffect(() => {
        setSource(props.source)
        videoRef.current?.load()
    }, [props.source])

    const handlePlay = () => {
        mediaLibrary.play(videoPlayer)
    }

    return <div className="rounded-lg h-fit flex justify-center">
        <video ref={videoRef} controls playsInline className="rounded-lg" onPlay={() => handlePlay()}>
            <source src={source} type="video/mp4" />
            {localization.videoNotSupported}
        </video>
    </div>

}