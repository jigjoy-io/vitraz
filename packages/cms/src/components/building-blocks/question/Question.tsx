import React from "react"
import QuestionContent from "./QuestionContent"

export default class Question extends React.Component<any> {

    children = React.Children.toArray(this.props.children)

    constructor(props: any){
        super(props)

        if (!this.children[0] || (this.children[0] as any).type !== QuestionContent) {
            console.error('The first child must be a MediaComponent.')
        }
    }


	render() {
		return (
			<div>{this.props.children}</div>
		)
	}

}