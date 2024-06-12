import React, { useEffect, useState } from 'react'
import AudioButton from '../audio/AudioButton'

export default function Message(props: any) {

    const [message, setMessage] = useState(props.message)
    const [audio, setAudio] = useState(props.audio)
    const [position, setPosition] = useState(props.position)
    const [color, setColor] = useState(props.color)

    useEffect(() => {

        if (props.color == "primary") {
            setColor("bg-primary-light text-[black]")
        } else if (props.color == "secondary") {
            setColor("bg-default-light text-[black]")
        }

    }, [props.color])

    useEffect(() => {
        setMessage(props.message)
    }, [props.message])


    return (<div className="flex h-max w-full" style={{ justifyContent: position }}>
        <div className={`block w-[75%] p-4 rounded-lg ${position=='left'?'rounded-bl-none': 'rounded-br-none'} ${(color)}`} style={{ justifyContent: position }}>
                <div>{message}</div>
                <div className={`mt-3 flex ${position}`} style={{ justifyContent: position }}><AudioButton source={audio} /></div>
            </div>
    </div>
    )

}
