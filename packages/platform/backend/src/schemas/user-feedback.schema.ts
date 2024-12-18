export const feedbackSchema = {
	type: "object",
	required: ["email", "feedback", "requestType"],
	properties: {
		email: {
			type: "string",
			format: "email",
		},
		feedback: {
			type: "string",
		},
		requestType: {
			enum: ["PREMIUM_REQUEST", "HELP_REQUEST"],
		},
	},
}
