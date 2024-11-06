import React, { useEffect, useState } from "react"
import Button from "../button/button"
import Grid from "../grid/grid"
import { useDispatch } from "react-redux"
import Tile from "../tile/tile"
import { carouselPageSwitched, pageExpanded, pageUpdated } from "../../reducers/page-reducer"

export default function CarouselTile(props: any) {
	const [color, setColor] = useState("")
	const [cta, setCta] = useState(props.cta)
	const dispatch = useDispatch()

	useEffect(() => {
		setColor(props.color)
	}, [props.color])

	useEffect(() => {
		setCta(props.cta)
	}, [props.cta])

	const load = () => {
		dispatch(carouselPageSwitched(props.page.config.pages[0].id))
		dispatch(pageUpdated(props.page))
		dispatch(pageExpanded(props.page.id))
	}

	return (
		<Tile color={color}>
			{props.image && (
				<div className={`${props.title || props.description ? "mb-4" : "mb-20"} px-1 block`}>
					<img className="float-right rounded-[5px]" height={128} width={128} src={props.image} />
				</div>
			)}

			<div className="text-heading">{props.title}</div>

			{props.description && <div className="pt-4">{props.description}</div>}

			<div className="pt-4">
				<Grid numberOfCols={1}>
					<Button text={cta} color="primary" action={load} />
				</Grid>
			</div>
		</Tile>
	)
}
