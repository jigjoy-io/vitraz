import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { PageNotFoundError } from "@errors/page-not-found-error"
import { retrievePage } from "@repositories/retrieve-page-repository"

export async function accessPageUseCase(pageId: string): Promise<ReturnPageDto> {
	const page: Page = await retrievePage(pageId)
	let parent = page.toOutputDto()

	if (parent.linkedPageId == null) {
		throw new PageNotFoundError(`Production page for page: ${pageId} is not found.`)
	}

	const productionPage: Page = await retrievePage(parent.linkedPageId)

	return productionPage.toOutputDto()
}
