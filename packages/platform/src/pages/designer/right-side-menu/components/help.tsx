import React from "react"
import { RequestType } from "../../../../api/feedback"
import UserFeedback from "./userFeedback"

export default function Help() {
	return (
		<UserFeedback
			heading="Contact Us"
			description="If you have encountered an issue or have suggestions for improving the platform, let our team know."
			requestType={RequestType.HELP_REQUEST}
		/>
	)
}
