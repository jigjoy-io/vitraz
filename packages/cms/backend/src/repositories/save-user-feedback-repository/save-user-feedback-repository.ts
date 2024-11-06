import { putUserFeedback } from "@adapters/secondary/feedback-database-adapter"
import { UserFeedback } from "@domain/user-feedback/user-feedback"

export async function saveUserFeedback(userFeedbak: UserFeedback): Promise<void> {
	// use the adapter to call the database
	await putUserFeedback(userFeedbak.toInputDto())
}
