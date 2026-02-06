import { Tooltip } from "@jigjoy-io/ui-library"
import { Component } from "react"

export default class ToolbarButtonWrapper extends Component<any> {
	render() {
		return (
			<Tooltip message={this.props.tooltip} className="bg-[black] text-[white]">
				<div className="hover:bg-primary-light border-2 border-[transparent] rounded-[5px] cursor-pointer h-fit w-fit">
					{this.props.children}
				</div>
			</Tooltip>
		)
	}
}
