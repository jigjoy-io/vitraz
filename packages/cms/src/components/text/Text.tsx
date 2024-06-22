import React, { useEffect, useState } from 'react'
import alignmentVariations from '../../util/alignmentVariations'

export default function Text(props: any) {

	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return <div className={`flex flex-col justify-end text-paragraph h-min-[1.5rem] h-[1.5rem] pb-[1px] ${alignmentVariations[position]}`} >
		<div className='h-[1rem]'>{props.text}</div>
	</div>

}
