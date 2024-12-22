import React, { useEffect, useState } from "react"
import AudioButton from "./audio-button"

export default function Message(props: any) {
	const [message, setMessage] = useState(props.message)
	const [audio, setAudio] = useState(props.audio)
	const [position, setPosition] = useState(props.position)
	const [color, setColor] = useState(props.color)

	useEffect(() => {
		setMessage(props.message)
	}, [props.message])

	useEffect(() => {
		setColor(props.color)
	}, [props.color])

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	useEffect(() => {
		setAudio(props.audio)
	}, [props.audio])

	return (
		<div className={`flex h-max w-full`} style={{ justifyContent: position }}>
			<div className={`block w-[75%] p-4 rounded-[5px] ${position == "left" ? "rounded-bl-none" : "rounded-br-none"} ${color}`} style={{ justifyContent: position }}>
				<div>{message}</div>
				<div className={`mt-3 flex ${position}`} style={{ justifyContent: position }}>
					<AudioButton id={props.id} source={audio} />
				</div>
			</div>
		</div>
	)
}
