import React, { useEffect, useState } from 'react'
import alignmentVariations from '../../util/style-helper/alignment-variations'

export default function Heading(props: any) {


	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return (
		<div className={`inline-block w-[100%] h-min-[2rem] h-max ${alignmentVariations[position]}`}  >
			<div className='text-heading'>{props.text}</div>
		</div>
	)

}