import React, { lazy } from "react"

const DefaultToolbar = lazy(() => import('../components/toolbar/DefaultToolbar'))

const textToolbar = (): any => (WrappedComponent: any) => {
	return class extends React.Component<any>{

		state = {
			editing : true
		}

		render() {
			return this.state.editing ? 
				 <DefaultToolbar {...this.props}>
					<WrappedComponent {...this.props}/>
				</DefaultToolbar>
			:
				<WrappedComponent {...this.props} />
			
		}
	}
}

export default textToolbar
