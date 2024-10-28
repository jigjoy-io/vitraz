import Responses from "@utils/api-responses"

// we would typically use middy - but to keep this simple to read
// without mutliple additional packages lets build outselves
export function errorHandler(error: Error | unknown) {
	console.error(error)

	let response: any

	if (error instanceof Error) {
		switch (error.name) {
			case "ValidationError":
				response = Responses._400({ errorMessage: error.message })
				break
			case "PageNotFoundError":
				response = Responses._404({ errorMessage: error.message })
				break
			default:
				response = Responses._500({ errorMessage: "Something went wrong" })
				break
		}
	} else {
		response = Responses._500({ errorMessage: "Something went wrong" })
	}

	return response
}
