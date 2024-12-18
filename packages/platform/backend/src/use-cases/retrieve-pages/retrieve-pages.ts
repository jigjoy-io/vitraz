import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { retrievePages } from "@repositories/retrieve-pages-repository"

export async function retrievePagesUseCase(origin: string): Promise<ReturnPageDto[]> {
	const pages: Page[] = await retrievePages(origin)

	let result: ReturnPageDto[] = []
	pages.forEach((page) => {
		let dto = page.toOutputDto()
		result.push(dto)
	})

	return result
}
