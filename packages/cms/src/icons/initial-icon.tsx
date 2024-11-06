import React from "react"

export default function InitialIcon({ initials }) {
	return (
		<div className="rounded-[5px] h-[32px] w-[32px] flex items-center bg-primary justify-center">
			<p className="flex justify-center items-center text-white text-paragraph">{initials}</p>
		</div>
	)
}
