import React, { useState } from "react"
import Heading from "../../../../components/heading/heading"
import Text from "../../../../components/text/text"
import Button from "../../../../components/button/button"
import TextArea from "../../../../components/textarea/textarea"
import { getCurrentUser } from "aws-amplify/auth"
import { RequestType, saveUserFeedback } from "../../../../api/feedback"

interface LocalizationStrings {
	heading: string
	description: string
	placeholder: string
	errorMessage: string
	successMessage: string
	cta: string
}

interface UserFeedbackProps {
	requestType: RequestType
	localization: LocalizationStrings
}

export default function UserFeedback({ localization, requestType }: UserFeedbackProps) {
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleChange = (value) => {
		setFeedbackMessage(value)
	}

	const submitRequest = async () => {
		if (!feedbackMessage) {
			setErrorMessage(localization.errorMessage)
			return
		}

		setSuccessMessage(localization.successMessage)

		const user = await getCurrentUser()
		const { username, signInDetails } = user
		const email = signInDetails?.loginId || username

		const params = {
			requestType: requestType,
			email: email,
			feedback: feedbackMessage,
		}

		saveUserFeedback(params)
	}

	return (
		<div className="mt-20 flex flex-col justify-center items-center gap-6 px-20">
			<Heading position="center" text={localization.heading} />
			<Text position="center" text={localization.description} />
			{successMessage ? (
				<div className="text-[green] text-center">{successMessage}</div>
			) : (
				<>
					<div className="w-[500px] max-w-[100%]">
						<TextArea placeholder={localization.placeholder} onChange={handleChange} />
					</div>
					<div className="text-[red]">{errorMessage}</div>
					<Button text={localization.cta} action={submitRequest} />
				</>
			)}
		</div>
	)
}
