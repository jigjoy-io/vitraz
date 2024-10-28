import React, { useState } from "react"
import { useEffect } from "react"
import FailedIcon from "../../icons/failed-icon"
import SuccessIcon from "../../icons/success-icon"
import InfoIcon from "../../icons/info-icon"

export default function Alert(props: any) {
	const [bg, setBg] = useState("bg-alert-success")
	const [icon, setIcon] = useState(null)

	const data: any = {
		success: {
			bg: "bg-alert-success",
			icon: SuccessIcon,
		},
		danger: {
			bg: "bg-alert-danger",
			icon: FailedIcon,
		},
		info: {
			bg: "bg-alert-info",
			icon: InfoIcon,
		},
	}

	useEffect(() => {
		let type = data[props.type]
		setBg(type.bg)
		setIcon(type.icon)
	}, [props.type])

	const renderIcon = () => {
		let config = data[props.type]
		return <config.icon />
	}

	return (
		<div className={`${bg} p-4 rounded-lg`}>
			<div className="flex items-center">
				<div style={{ width: "24px", height: "24px" }}>{icon != null && renderIcon()}</div>
				<div className="pl-3">
					<div className="font-bold">{props.title}</div>
					<div>{props.message}</div>
				</div>
			</div>
		</div>
	)
}
