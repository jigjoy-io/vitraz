import React, { useEffect, useRef, useState } from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../util/store"

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
    const videoRef = useRef(null as any)
    const lang = useLanguage()

    useEffect(() => {
        localization.setLanguage(lang)
    }, [])

    useEffect(() => {
        setSource(props.source)
        videoRef.current?.load()
    }, [props.source])

    return <div className="rounded-lg h-fit flex justify-center">
        <video ref={videoRef} controls playsInline autoPlay className="rounded-lg">
            <source src={source} type="video/mp4" />
            {localization.videoNotSupported}
        </video>
    </div>

}