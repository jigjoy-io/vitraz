import React from 'react'
import contentEditing from '../decorators/contentEditing'

@contentEditing()
export default class Text extends React.Component<any> {

	render() {
		return (
			<p>{this.props.children}</p>
		)

	}


}
