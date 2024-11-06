import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../../util/click-outside-listener"

export default function PopoverContent(props: any) {
	const [isOpen, setIsOpen] = useState(null)

	const [top, setTop] = useState(0)
	const [left, setLeft] = useState(0)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsOpen(props.isOpen)
	}, [props.isOpen])

	useEffect(() => {
		if (props.rect != null) {
			let top = props.rect.top

			setTop(top)
			setLeft(props.rect.x + props.rect.width - 25)
		}

		// If the popover content exceeds the viewport, position it higher to ensure full visibility.
		if (ref.current) {
			let contentRect = ref.current.getBoundingClientRect()
			if (contentRect.top + contentRect.height > window.innerHeight) setTop(window.innerHeight - contentRect.height - 16)
		}
	}, [props.rect])

	return (
		<div>
			{props.on && (isOpen == null || isOpen) && (
				<>
					{createPortal(
						<ClickOutsideListener callback={props.onClose}>
							<div
								className={`fixed flex rounded-[5px] p-1 shadow bg-[white] 
						${props.position == "left" && "-translate-x-[100%]"} 
						${props.position == "right" && "translate-x-[25px]"}`}
								style={{ top: top, left: left }}
								ref={ref}
							>
								{props.children}
							</div>
						</ClickOutsideListener>,
						document.body,
					)}
				</>
			)}
		</div>
	)
}
