import React from "react"
import { useState } from "react"

export default function Tabs(props: any) {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className="w-[100%]">
			<div className="flex cursor-pointer border-b border-light my-2">
				{React.Children.map(props.children, (child, index) => (
					<div className={`${index == activeTab && "text-primary border-b-4 border-primary"} px-5`} onClick={() => setActiveTab(index)}>
						{child.key}
					</div>
				))}
			</div>
			<div className="py-2">{React.Children.map(props.children, (child, index) => React.cloneElement(child, { display: activeTab == index }))}</div>
		</div>
	)
}
