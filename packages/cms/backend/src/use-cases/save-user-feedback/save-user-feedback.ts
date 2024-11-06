import { UserFeedback } from "@domain/user-feedback/user-feedback"
import { UserFeedbackDto } from "@dto/user-feedback/user-feedback"
import { saveUserFeedback } from "@repositories/save-user-feedback-repository/save-user-feedback-repository"

export async function saveUserFeedbackUseCase(userFeedback: UserFeedbackDto): Promise<void> {
	const feedback = UserFeedback.create(userFeedback)

	await saveUserFeedback(feedback)
}
