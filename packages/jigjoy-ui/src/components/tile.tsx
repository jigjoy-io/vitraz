import React from "react"

export default function Tile(props: any) {
	return <div className={`${props.color} rounded-[20px] shadow w-[100%] px-4 py-6 border border-light`}>{props.children}</div>
}
