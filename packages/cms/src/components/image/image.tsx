import React, { useEffect, useState } from "react"

export default function Image(props: any) {
	const [width, setWidth] = useState(400)
	const [position, setPosition] = useState(props.position)
	const [source, setSource] = useState(props.source)
	const [radius, setRadius] = useState("rounded-[20px]")

	useEffect(() => {
		if (props.radius == "full") {
			setRadius("rounded-full")
		}
	}, [props.radius])

	useEffect(() => {
		if (props.size == "small") {
			setWidth(200)
		} else if (props.size == "medium") {
			setWidth(300)
		} else if (props.size == "large") {
			setWidth(400)
		}
	}, [props.size])

	useEffect(() => {
		setSource(props.source)
	}, [props.source])

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return (
		<div className="flex h-max w-full" style={{ justifyContent: position }}>
			<img className={`${radius}`} width={width} height="auto" src={source} loading="lazy" />
		</div>
	)
}
