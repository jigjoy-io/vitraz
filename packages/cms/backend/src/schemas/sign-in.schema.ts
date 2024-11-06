export const schema = {
	type: "object",
	required: ["email"],
	properties: {
		email: {
			type: "string",
			format: "email",
			language: {
				enum: ["US", "RS"],
			},
		},
	},
}
