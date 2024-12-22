import React, { useRef, useState, useEffect } from "react"

function Popover(props: any) {
	const [on, setOn] = useState(props.on)
	const [rect, setRect] = useState<null | any>(null)
	const ref = useRef<HTMLDivElement>(null)

	const toggle = (e) => {
		e.stopPropagation()
		setOn(!on)
	}

	useEffect(() => {
		if (ref.current) setRect(ref.current.getBoundingClientRect())
	}, [on])

	return (
		<div className="flex flex-row" ref={ref}>
			{React.Children.map(props.children, (child) => React.cloneElement(child, { on: on, toggle: toggle, onClose: props.onClose, rect: rect }))}
		</div>
	)
}

export default Popover
