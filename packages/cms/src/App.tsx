
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Smartlook from 'smartlook-client'

function App(props: any) {

	// useEffect(() => {
	// 	const id = window.location.pathname.substring(1) // remove '/' from begining
	// }, [])

	useEffect(() => {
		//toggleBlocking(props.isInteractionBlocked)
	}, [props.isInteractionBlocked])

	useEffect(() => {
		let smartLookKey = process.env.REACT_APP_SMARTLOOK_API_KEY || ""
		Smartlook.init(smartLookKey)
	}, [])


	return <></>

}


const mapStateToProps = (state: any) => {
	return {
		isInteractionBlocked: state.toolbar.isInteractionBlocked,
		mode: state.page.mode
	}
}

export default connect(mapStateToProps, null)(App)

