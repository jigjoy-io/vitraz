import React, { useEffect, useRef, useState } from "react"

export default function Video(props: any) {
	const [source, setSource] = useState(props.source)
	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		setSource(props.source)
		if (videoRef.current) {
			videoRef.current.load()
			videoRef.current.onended = () => {
				videoRef.current?.pause()
			}
		}
	}, [props.source])

	const handlePlay = () => {
		if (videoRef.current?.paused) {
			props.onPlay(props.id)
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
