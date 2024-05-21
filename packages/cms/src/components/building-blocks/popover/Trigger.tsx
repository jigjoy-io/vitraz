import React from 'react'

export default class Content extends React.Component<any> {

	
	render() {
		return (
			<div className='cursor-pointer max-w' onClick={this.props.toggle}>{this.props.children}</div>
		)
	}

}
