export async function createAuthChallengeHandler(event: any) {
	event.response.publicChallengeParameters = {
		email: event.request.userAttributes.email,
	}

	// the verify step would decrypt this and check the user's answer
	event.response.privateChallengeParameters = {
		challenge: event.request.userAttributes["custom:authChallenge"],
	}

	return event
}
