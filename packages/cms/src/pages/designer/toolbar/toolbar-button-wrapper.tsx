import React from "react"
import Tooltip from "../../../components/tooltip/tooltip"

export default class ToolbarButtonWrapper extends React.Component<any> {
	render() {
		return (
			<Tooltip message={this.props.tooltip}>
				<div className="bg-[transparent] hover:bg-primary-light border-2 border-[transparent] rounded-md cursor-pointer h-fit w-fit">{this.props.children}</div>
			</Tooltip>
		)
	}
}
