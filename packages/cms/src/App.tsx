
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Smartlook from 'smartlook-client'
import { loadPage } from './reducers/pageReducer'

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
		pageId: state.page.pageId,
		mode: state.page.mode
	}
}

const mapDispatchToProps = {
	loadPage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

