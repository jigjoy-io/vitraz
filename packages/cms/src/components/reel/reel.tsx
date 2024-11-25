import React, { useEffect, useRef, useState } from "react"
import { useActivePlayer } from "../../util/store"
import { activePlayerUpdated } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"

export default function Reel(props: any) {
	const [source, setSource] = useState(props.source)
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const activePlayer = useActivePlayer()

	const dispatch = useDispatch()

	useEffect(() => {
		setSource(props.source)
		if (videoRef.current) {
			videoRef.current.load()
			videoRef.current.onended = () => {
				videoRef.current?.pause()
			}
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

	return (
		<div className="rounded-[5px] h-fit flex justify-center">
			<video ref={videoRef} controls playsInline className="rounded-[5px]" onPlay={() => handlePlay()}>
				<source src={source} type="video/mp4" />
				Sorry, your browser doesn't support embedded videos.
			</video>
		</div>
	)
}
