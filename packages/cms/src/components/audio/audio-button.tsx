import React, { useEffect, useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"
import SpeakerOffIcon from "../../icons/speaker-off-icon"
import MediaLibrary from "./media-library"
import AudioPlayer from "./audio-player"

interface AudioButtonProps {
    id: string,
    position?: string
    source: string
}

function AudioButton({ id, position, source }: AudioButtonProps){
    const [isPlaying, setIsPlaying] = useState(false)

    let params = {
        id: id,
        source: source,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false)
    }

    const audioPlayer : AudioPlayer = new AudioPlayer(params)
    const mediaLibrary = MediaLibrary.getInstance()

    mediaLibrary.addPlayer(audioPlayer)

    useEffect(() => {
        return () => mediaLibrary.removePlayer(audioPlayer)
    }, [])

    const togglePlay = () => {

        mediaLibrary.play(audioPlayer)
    }

    return (
        <div className="flex w-full" style={{ justifyContent: position }}>
            <div
                className='w-max hover:bg-primary-light border-2 border-[transparent] p-1 rounded-md cursor-pointer'
                onClick={togglePlay}
            >
                {isPlaying ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
            </div>
        </div>
    )
}

export default AudioButton