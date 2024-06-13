import React, { useEffect, useState } from 'react'

export default function Heading(props: any) {


	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return (
		<div className="flex h-max w-full" style={{ justifyContent: position }} >
			<p className='text-heading'>{props.text}</p>
		</div>
	)

}