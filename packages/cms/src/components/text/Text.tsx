import React, { useEffect, useState } from 'react'
import alignmentVariations from '../../util/alignmentVariations'

export default function Text(props: any) {

	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return <div className={`inline-block w-[100%]  h-min-[1.7rem] h-max ${alignmentVariations[position]}`} style={{ justifyContent: position }}  >
		<div className='text-paragraph'>{props.text}</div>
	</div>

}
