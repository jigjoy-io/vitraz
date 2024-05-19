import React from "react";

export default class MenuItem extends React.Component<any> {

	render() {
		return (
			<div className='w-full hover:bg-primary-light border-2 border-[white] hover:border-primary p-1 px-3 rounded-sm cursor-pointer'>{this.props.children}</div>
		)
	}

}