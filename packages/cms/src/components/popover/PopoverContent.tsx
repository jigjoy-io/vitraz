import React from 'react'
import { createPortal } from 'react-dom'
import ClickOutsideListener from './ClickOutsideListener'

export default function PopoverContent(props: any) {
	
	return <div>
		{
			props.on && <>
				{createPortal(<ClickOutsideListener callback={props.onClose}>
					<div className={`fixed z-10 flex rounded-md p-1 shadow bg-[white]`} style={{ top: props.rect.top, left: props.rect.x + props.rect.width + 10 }}>
						{props.children}
					</div>
				</ClickOutsideListener>, document.body)}
			</>
		}
	</div>

}
