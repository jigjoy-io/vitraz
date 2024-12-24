export const API_HOST = process.env.REACT_APP_API
import { signIn, confirmSignIn } from "aws-amplify/auth"

export async function createSingInChallenge(auth: any) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(auth),
	}

	const res: any = await fetch(`${API_HOST}/send-magic-link/`, options)
	return await res.json()
}

export const handleConfirmSignIn = async (email, challengeResponse) => {
	const { nextStep } = await signIn({
		username: email,
		options: {
			authFlowType: "CUSTOM_WITHOUT_SRP",
		},
	})

	if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
		// to send the answer of the custom challenge
		const output = await confirmSignIn({ challengeResponse })
		return output.isSignedIn
	} else {
		return false
	}
}
