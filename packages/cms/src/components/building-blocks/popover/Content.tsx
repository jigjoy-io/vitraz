import React from 'react'
import ClickOutsideListener from '../../../util/ClickOutsideListener'

export default class Content extends React.Component<any> {


	action(props) {
		alert(JSON.stringify(props))
	}

	render() {
		return (<div>
			{
				this.props.on && <ClickOutsideListener callback={this.props.toggle}>
					<div className={`absolute -translate-y-[25%] ml-3 flex rounded-md p-1 shadow bg-[white]`} style={{ pointerEvents: 'auto' }}>
						{React.Children.map(this.props.children, child =>
							React.cloneElement(child, { action: this.action, borderOn: true }))}
					</div>
				</ClickOutsideListener>
			}
		</div>

		)
	}

}
