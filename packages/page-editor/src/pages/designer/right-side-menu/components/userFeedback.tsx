import React, { lazy, Suspense, useState } from "react"

const Button = lazy(() => import("renderer/Button"))
import TextArea from "../../../../components/textarea/textarea"
import { getCurrentUser } from "aws-amplify/auth"
import { RequestType, saveUserFeedback } from "../../../../api/feedback"

interface UserFeedbackProps {
	heading: string
	description: string
	requestType: RequestType
}

export default function UserFeedback({ heading, description, requestType }: UserFeedbackProps) {
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleChange = (value) => {
		setFeedbackMessage(value)
	}

	const submitRequest = async () => {
		if (!feedbackMessage) {
			setError(true)
			return
		}

		setSuccess(true)

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
		<div className="flex flex-col justify-center items-center gap-4 px-10">
			<div className="text-heading text-center">{heading}</div>
			<div className="text-center">
				<p>{description}</p>
			</div>
			{success ? (
				<div className="text-[green] text-center">
					Your message has been successfully saved. Our team will contact you shortly.
				</div>
			) : (
				<>
					<div className="max-w-[500px] w-[100%]">
						<TextArea placeholder="Leave a message, and we’ll contact you soon." onChange={handleChange} />
					</div>
					{error && <div className="text-[red]">The message field is required. Please enter your message.</div>}
					<Suspense>
						<Button text="Submit" action={submitRequest} />
					</Suspense>
				</>
			)}
		</div>
	)
}
