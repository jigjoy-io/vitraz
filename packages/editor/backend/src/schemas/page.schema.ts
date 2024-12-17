export const schema = {
	type: "object",
	required: ["type"],
	discriminator: { propertyName: "type" },
	oneOf: [
		{
			properties: {
				id: {
					type: "string",
				},
				name: {
					type: "string",
				},
				origin: {
					type: "string",
				},
				created: {
					type: "string",
				},
				updated: {
					type: "string",
				},
				type: {
					enum: ["blank"],
				},
				environment: {
					enum: ["production", "development"],
				},
				linkedPageId: {
					type: ["string", "null"],
				},
				config: {
					type: "object",
					properties: {
						buildingBlocks: {
							type: "array",
						},
					},
					required: ["buildingBlocks"],
				},
			},
			required: ["config", "origin"],
		},
		{
			properties: {
				id: {
					type: "string",
				},
				name: {
					type: "string",
				},
				origin: {
					type: "string",
				},
				created: {
					type: "string",
				},
				updated: {
					type: "string",
				},
				type: {
					enum: ["carousel"],
				},
				environment: {
					enum: ["production", "development"],
				},
				linkedPageId: {
					type: ["string", "null"],
				},
				config: {
					type: "object",
					properties: {
						pages: {
							type: "array",
							items: {
								type: "object",
							},
						},
					},
					required: ["pages"],
				},
			},
			required: ["config", "origin"],
		},
	],
}
