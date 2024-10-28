import React from "react"
import VisitorFactory from "./visitor-factory"

export default function BuildingBlock(props: any) {
	return <>{VisitorFactory.getVisitingBlock(props.mode, props)}</>
}
