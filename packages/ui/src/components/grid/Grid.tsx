import React, { useEffect, useState } from 'react'
import './../../index.css'

export default function Grid(props: any) {

	const [layout, setLayout] = useState(props.layout)

	useEffect(() => {

		if (props.numberOfCols == 1) {
			setLayout("grid-cols-1")
		}
		else if (props.numberOfCols == 2) {
			setLayout("grid-cols-2")
		}
	})

	const action = (props: any) => {
		props.action(props)
	}

	return (
		<div className={`grid ${layout} w-max rounded-md gap-1`}>
			{React.Children.map(props.children, child =>
				React.cloneElement(child, { action: action, borderOn: false }))}
		</div>
	)

}
