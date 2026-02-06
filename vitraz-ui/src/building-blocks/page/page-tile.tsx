import { useEffect, useState } from "react"
import Grid from "../../components/grid/grid"
import { useDispatch } from "react-redux"
import { pageExpanded, pageUpdated } from "../../reducers/page-reducer"
import colorVariants from "../../util/style-helper/color-variants"
import { Button } from "@jigjoy-io/ui-library"

export default function PageTile(props: any) {
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
		dispatch(pageUpdated(props.page))
		dispatch(pageExpanded(props.page.id))
	}

	return (
		<div className={`${colorVariants[color]} rounded-[20px] shadow w-[100%] px-4 py-6 border border-light`}>
			{props.image && (
				<div className={`${props.title || props.description ? "mb-4" : "mb-20"} px-1 block`}>
					<img className="float-right rounded-[5px]" height={128} width={128} src={props.image} />
				</div>
			)}

			<div className="text-heading">{props.title}</div>

			{props.description && <div className="pt-4">{props.description}</div>}
			<div className="pt-4">
				<Grid numberOfCols={1}>
					<Button onClick={load}>{cta}</Button>
				</Grid>
			</div>
		</div>
	)
}
