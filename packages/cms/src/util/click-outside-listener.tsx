import React from "react"

/**
 * Component that execute callback function if user click outside of child component
 */
class ClickOutsideListener extends React.Component<any> {
	wrapperRef: React.RefObject<HTMLDivElement>

	constructor(props: any) {
		super(props)

		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside)
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside(event: any) {
		if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
			this.props.callback()
		}
	}

	render() {
		return <div ref={this.wrapperRef}>{this.props.children}</div>
	}
}

export default ClickOutsideListener
