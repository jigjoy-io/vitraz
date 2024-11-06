import { Page } from "@domain/page/page"
import { ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { retrievePage } from "@repositories/retrieve-page-repository"
import { updatePages } from "@repositories/update-pages-repository"

export async function publishPageUseCase(page: UpdatePageDto): Promise<ReturnPageDto[]> {
	// throws error if page not exists
	const retrievedPage: Page = await retrievePage(page.id)

	// validates new page schema
	let pageToPublish: Page = Page.update(page, retrievedPage)

	// update production config
	let pagesToPublish: Page[] = Page.publish(pageToPublish)

	const pages: Page[] = await updatePages(pagesToPublish)

	let result: ReturnPageDto[] = []
	pages.forEach((page) => {
		let dto = page.toOutputDto()
		result.push(dto)
	})

	return result
}
