import React from "react"
import SpeakerOnIcon from "../../icons/SpeakerOnIcon"

function AudioButton(props: any) {

    const play = ((audio: string) => {
        new Audio(audio).play()
    })

    return <div className='w-max hover:bg-primary-light border-2 border-[transparent] hover:border-primary p-1 rounded-md cursor-pointer' onClick={() => play(props.source)}>
        <SpeakerOnIcon />
    </div>
}

export default AudioButton