
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Page from './components/pages/Page'
import AudioButton from './components/audio/AudioButton'
import { loadPage } from './reducers/pageReducer'
import Conversation from './components/conversation/Conversation'

// import RemoteButtonProps from "@mfTypes/Button"
// const RemoteButton = React.lazy(
//   () => import("ui/Button")
// ) as typeof RemoteButtonProps

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


	return <div style={{ pointerEvents: isInteractionBlocked ? 'none' : 'auto', zIndex: 100 }}>
		{(pageId != null && mode != null) && <Page key={pageId} id={pageId} mode={mode} />}
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

