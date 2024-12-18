import { isEmpty, last } from "lodash"

export async function defineAuthChallengeHandler(event: any) {
	if (event.request.userNotFound) {
		event.response.issueTokens = false
		event.response.failAuthentication = true
		return event
	}

	if (isEmpty(event.request.session)) {
		// Issue new challenge
		event.response.issueTokens = false
		event.response.failAuthentication = false
		event.response.challengeName = "CUSTOM_CHALLENGE"
	} else {
		const lastAttempt: any = last(event.request.session)
		if (lastAttempt.challengeResult === true) {
			// User gave right answer
			event.response.issueTokens = true
			event.response.failAuthentication = false
		} else {
			// User gave wrong answer
			event.response.issueTokens = false
			event.response.failAuthentication = true
		}
	}

	return event
}
