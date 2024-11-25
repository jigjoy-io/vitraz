import React from "react"
import { RequestType } from "../../../../api/feedback"
import UserFeedback from "./userFeedback"

export default function Premium() {
	return (
		<UserFeedback
			heading="Premium Service"
			description="Need help with content creation? Our team will create an app for you to efficiently collect leads and engage your audience."
			requestType={RequestType.PREMIUM_REQUEST}
		/>
	)
}
