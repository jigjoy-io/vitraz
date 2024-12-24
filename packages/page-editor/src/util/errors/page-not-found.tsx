import React from "react"
import Logo from "../../icons/logo"

export function PageNotFound(props) {
	return (
		<div className="flex flex-col h-[100dvh] pt-[10%] items-center gap-10">
			<Logo />
			<div className="text-center">
				<p className="text-title">{props.message}</p>
			</div>
		</div>
	)
}
