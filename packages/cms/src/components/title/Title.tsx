import React, { useEffect, useState } from 'react'
import alignmentVariations from '../../util/alignmentVariations'

export default function Title(props: any){

	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return <div className={`${alignmentVariations[position]}`} >
			<div className='text-title'>{props.text}</div>
		</div>


}
