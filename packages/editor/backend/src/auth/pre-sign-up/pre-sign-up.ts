import { PreSignUpTriggerEvent } from "aws-lambda"

export async function preSignUpHandler(event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> {
	event.response.autoConfirmUser = true
	return event
}
