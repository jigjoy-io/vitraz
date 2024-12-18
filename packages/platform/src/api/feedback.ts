export const API_HOST = process.env.REACT_APP_API

export enum RequestType {
	HELP_REQUEST = "HELP_REQUEST",
	PREMIUM_REQUEST = "PREMIUM_REQUEST",
}

interface UserFeedbackRequest {
	requestType: RequestType
	feedback: string
	email: string
}

export async function saveUserFeedback(feedback: UserFeedbackRequest): Promise<void> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(feedback),
	}

	await fetch(`${API_HOST}/feedback`, options)
}
