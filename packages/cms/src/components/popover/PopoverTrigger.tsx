import React from 'react'

export default function PopoverTrigger(props: any) {

	return (
		<div className='cursor-pointer max-w' onClick={props.toggle}>{props.children}</div>
	)

}
