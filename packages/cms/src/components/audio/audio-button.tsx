import React, { useEffect, useRef, useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"
import SpeakerOnIcon1 from "../../icons/speaker-on-1-icon"
import SpeakerOnIcon2 from "../../icons/speaker-on-2-icon"
import { activePlayerUpdated } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { useActivePlayer } from "../../util/store"

interface AudioButtonProps {
	id: string
	position?: string
	source: string
}

function AudioButton({ id, position, source }: AudioButtonProps) {
	const [animationState, setAnimationState] = useState(0)
	const dispatch = useDispatch()
	let intervalId: NodeJS.Timeout | null = null

	const [isPlaying, setIsPlaying] = useState(false)
	const activePlayer = useActivePlayer()
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (isPlaying) {
			intervalId = setInterval(() => {
				setAnimationState((prevState) => (prevState + 1) % 3)
			}, 500)
		} else {
			setAnimationState(0)
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId)
			}
		}
	}, [isPlaying])

	const stopPlaying = () => {
		if (audioRef.current) {
			setIsPlaying(false)
			audioRef.current.pause()
		}
	}

	const startPlaying = () => {
		if (audioRef.current) {
			audioRef.current.src = source

			audioRef.current.onended = () => stopPlaying()
			setIsPlaying(true)
			audioRef.current.play()
		}
	}

	useEffect(() => {
		return () => {
			setIsPlaying(false)

			if (audioRef.current) audioRef.current.pause()
		}
	}, [])

	useEffect(() => {
		if (activePlayer != id) {
			stopPlaying()
		}
	}, [activePlayer])

	const togglePlay = () => {
		if (!isPlaying) {
			startPlaying()
			dispatch(activePlayerUpdated(id))
		} else {
			dispatch(activePlayerUpdated(null))
		}
	}

	const renderIcon = () => {
		switch (animationState) {
			case 0:
				return <SpeakerOnIcon1 />
			case 1:
				return <SpeakerOnIcon2 />
			case 2:
				return <SpeakerOnIcon />
			default:
				return <SpeakerOnIcon1 />
		}
	}

	return (
		<>
			<audio className="hidden" ref={audioRef} />
			<div className="flex w-full" style={{ justifyContent: position }}>
				<div className="w-max hover:bg-primary-light border-2 border-[transparent] p-1 rounded-md cursor-pointer" onClick={togglePlay}>
					{renderIcon()}
				</div>
			</div>
		</>
	)
}

export default AudioButton
