import React from "react"
import Tile from "./tile"

export default function Profile(props: any) {
	return (
		<Tile color={props.color}>
			<div className="flex flex-row gap-4">
				<img className="float-left w-[100px] h-[100px] rounded-full" src={props.image} />

				<div className="flex flex-col items-center justify-center grow break-all">
					<div className="text-xl font-bold">{props.firstName}</div>
					<div className="text-xl font-bold">{props.lastName}</div>
					<div className="p-1">{props.username}</div>
				</div>
			</div>
			<div className="pt-4 w-max[100%] break-words">
				<p>{props.description}</p>
			</div>
		</Tile>
	)
}
