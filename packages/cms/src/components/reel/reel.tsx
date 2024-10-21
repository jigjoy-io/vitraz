import React, { useEffect, useRef, useState } from "react"
import LocalizedStrings from "react-localization"
import { useActivePlayer, useLanguage } from "../../util/store"
import { activePlayerUpdated } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"

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
    const activePlayer = useActivePlayer()
    const lang = useLanguage()
    const dispatch = useDispatch()

    useEffect(() => {
        localization.setLanguage(lang)
    }, [])

    useEffect(() => {
        setSource(props.source)
        if(videoRef.current){
            videoRef.current.load()
            videoRef.current.onended = () => { videoRef.current?.pause()}
        }

    }, [props.source])


    useEffect(() => {


        if (activePlayer && activePlayer != props.id) {
            videoRef.current?.pause()
        }


    }, [activePlayer])


    const handlePlay = () => {
        if (videoRef.current?.paused) {
            dispatch(activePlayerUpdated(props.id))
        } else {
            dispatch(activePlayerUpdated(null))
        }
    }

    return <div className="rounded-lg h-fit flex justify-center">
        <video ref={videoRef} controls playsInline className="rounded-lg" onPlay={() => handlePlay()}>
            <source src={source} type="video/mp4" />
            {localization.videoNotSupported}
        </video>
    </div>

}
