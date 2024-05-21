import React from 'react'
import contentEditing from '../../decorators/contentEditing'
import textToolbar from '../../decorators/textToolbar'

@textToolbar()
@contentEditing()
export default class Title extends React.Component<any> {

	render() {
		return (
			<p className='text-4xl font-bold'>{this.props.children}</p>
		)
	}

}
