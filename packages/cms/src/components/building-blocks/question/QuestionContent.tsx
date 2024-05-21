import React from "react"

export default class QuestionContent extends React.Component<any> {

    children = React.Children.toArray(this.props.children)

    constructor(props: any){
        super(props)
    }

	render() {
		return (
			<div className="py-4">{this.props.children}</div>
		)
	}

}