import { RequestType } from "@models/types"

export type UserFeedbackDto = {
	id: string
	requestType: RequestType
	feedback: string
	email: string
}
