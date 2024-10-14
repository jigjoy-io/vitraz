import React, { useEffect, useState } from 'react'

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

	return (
		<div className={`grid ${layout} rounded-md gap-1 w-[100%]`}>
			{React.Children.map(props.children, child =>
				React.cloneElement(child, { borderOn: false }))}
		</div>
	)

}
