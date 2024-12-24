import React from "react"
import Tooltip from "../../../../../jigjoy-ui/src/components/tooltip"

export default class TooltipButtonWrapper extends React.Component<any> {
	render() {
		return (
			<Tooltip message={this.props.tooltip}>
				<div className="bg-[transparent] hover:bg-primary-light border-2 border-[transparent] rounded-[5px] cursor-pointer h-fit w-fit">{this.props.children}</div>
			</Tooltip>
		)
	}
}
