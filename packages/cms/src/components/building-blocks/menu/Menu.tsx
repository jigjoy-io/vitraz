import React from 'react'

export default class Menu extends React.Component<any> {

	render() {
		return (
			<div className='flex flex-col min-w-[250px] w-max p-2 shadow rounded-sm'>{this.props.children}</div>
		)
	}

}
