import React from "react";
import { Tooltip } from "./Tooltip"

export default class Item extends React.Component<any> {

	state = {
		selected: false
	}

	handleClick = () => {
		this.setState({
			selected: !this.state.selected
		})
		this.props.action(this.props)
	}

	render() {
		return (

			this.props.tooltip ?
				<Tooltip message={this.props.tooltip}>
					<div onClick={() => this.props.action(this.props)} 
						className={`w-full 
							${this.state.selected ? "bg-primary" : "bg-[white]"} 
							${this.props.borderOn && "!border-light shadow-md"} hover:border-primary
							hover:bg-primary-light border-2 border-[white] 
							p-2 rounded-lg cursor-pointer`}>
						{this.props.children}
					</div>
				</Tooltip>

				:

				<div onClick={this.handleClick}  className={`w-full ${this.state.selected ? "bg-primary" : "bg-[white]"} border-2 border-[white] hover:bg-primary-light  ${this.props.borderOn && "border-2 border-light shadow-md"}  p-2 hover:border-primary rounded-lg cursor-pointer`}>
					{this.props.children}
				</div>


		)
	}

}