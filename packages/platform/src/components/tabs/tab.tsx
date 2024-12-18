import React, { useEffect, useState } from "react"

export default function Tab(props: any) {
	const [display, setDisplay] = useState(false)

	useEffect(() => {
		setDisplay(props.display)
	}, [props.display])

	return <>{display && props.children}</>
}
