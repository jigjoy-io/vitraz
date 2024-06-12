import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ClickOutsideListener from './ClickOutsideListener'

export default function PopoverContent(props: any) {

	const [isOpen, setIsOpen] = useState(null)

	useEffect(() => {
		setIsOpen(props.isOpen)
	}, [props.isOpen])

	return <div>
		{
			(props.on && (isOpen==null || isOpen)) && <>
				{createPortal(<ClickOutsideListener callback={props.onClose}>
					<div className={`fixed z-10 flex rounded-md p-1 shadow bg-[white] -translate-x-[100%]`} style={{ top: props.rect.top + props.rect.height, left: props.rect.x + props.rect.width - 5 }}>
						{props.children}
					</div>
				</ClickOutsideListener>, document.body)}
			</>
		}
	</div>

}