import React from 'react'

export default class Group extends React.Component<any> {

	state = {
		layout: this.props.layout
	}

	componentDidMount() {
		if (this.props.layout == "column") {
			this.setState({
				layout: "grid-cols-1"
			})
		}
		else if (this.props.layout == "row") {
			this.setState({
				layout: "grid-cols-2"
			})
		}
	}

	action = (props) => {
		alert(JSON.stringify(props))
		//this.props.action(props)
	}

	render() {
		return (
			<div className={`grid ${this.state.layout} w-max rounded-md gap-2`}>
				{React.Children.map(this.props.children, child =>
					React.cloneElement(child, { action: this.action, borderOn: false }))}
			</div>
		)
	}

}
