import React from 'react'
import contentEditing from '../../decorators/contentEditing'
import textToolbar from '../../decorators/textToolbar'

@textToolbar()
@contentEditing()
export default class Text extends React.Component<any> {

	render() {
		return (
			<p className='text-2xl font-bold'>{this.props.children}</p>
		)
	}

}