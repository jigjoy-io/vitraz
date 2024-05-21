import React, { lazy } from "react"

const ContentEditingWrapper = lazy(() => import('../util/ContentEditingWrapper'))



const contentEditing = (): any => (WrappedComponent: any) => {

	
	return	class extends React.Component<any>{

		state = {
			editing : true
		}
	
		render() {
			return this.state.editing ? 
				 <ContentEditingWrapper {...this.props}>
					<WrappedComponent {...this.props} disabled/>
				</ContentEditingWrapper>
			:
				<WrappedComponent {...this.props} />
			
		}
	}
}

export default contentEditing
