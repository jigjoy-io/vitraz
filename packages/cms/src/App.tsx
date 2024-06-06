
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Page from './components/Page'
import Smartlook from 'smartlook-client'
import { loadPage } from './reducers/pageReducer'

function App(props: any) {

	const [isInteractionBlocked, toggleBlocking] = useState(false)
	const [pageId, setPageId] = useState<null | string>(props.pageId)
	const [mode, setMode] = useState<null | string>(props.mode)

	// useEffect(() => {
	// 	const id = window.location.pathname.substring(1) // remove '/' from begining
	// }, [])

	useEffect(() => {
		toggleBlocking(props.isInteractionBlocked)
	}, [props.isInteractionBlocked])

	useEffect(() => {
		setPageId(props.pageId)
	}, [props.pageId])

	useEffect(() => {
		setMode(props.mode)
	}, [props.mode])

	useEffect(() => {
		let smartLookKey = process.env.REACT_APP_SMARTLOOK_API_KEY || ""
		Smartlook.init(smartLookKey)
	}, [])


	return <div style={{ pointerEvents: isInteractionBlocked ? 'none' : 'auto', zIndex: 100 }}>
		{(pageId != null && mode != null) && <Page key={pageId} />}
		{/* <React.Suspense >
			<RemoteButton text="JigJoy 🦄" />
		</React.Suspense> */}
	</div>

}


const mapStateToProps = (state: any) => {
	return {
		isInteractionBlocked: state.toolbar.isInteractionBlocked,
		pageId: state.page.pageId,
		mode: state.page.mode
	}
}

const mapDispatchToProps = {
	loadPage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

