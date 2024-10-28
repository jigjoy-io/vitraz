import React, { useState } from "react"
import "./../../index.css"
import { createPortal } from "react-dom"

export default function Tooltip(props: any) {
	const [on, toggleTooltip] = useState(false)
	const [top, setTop] = useState(0)
	const [left, setLeft] = useState(0)

	const toggle = (e) => {
		const rect = e.target.getBoundingClientRect()
		setTop(rect.top)
		setLeft(rect.left + rect.width / 2)
		toggleTooltip(!on)
	}

	return (
		<div>
			{on &&
				createPortal(
					<div className="fixed w-max" style={{ top: top, left: left, transform: "translateY(36px)" }}>
						<div className="-translate-x-[50%] p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
							<div>{props.message}</div>
						</div>
					</div>,
					document.body,
				)}

			<div onMouseEnter={toggle} onMouseLeave={toggle}>
				{props.children}
			</div>
		</div>
	)
}
