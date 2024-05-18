import React, { lazy } from "react"


const editing = true
const ContentEditingWrapper = lazy(() => import('./../utils/ContentEditingWrapper'))

const contentEditing = (): any => (WrappedComponent: any) => {
	return class extends React.Component<any>{


		render() {
			if (editing) {
				return <ContentEditingWrapper {...this.props}>
					<WrappedComponent {...this.props} disabled />
				</ContentEditingWrapper>
			}
			else {
				return <WrappedComponent {...this.props} />
			}
		}
	}
}

export default contentEditing
