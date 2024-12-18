import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { retrievePage } from "@repositories/retrieve-page-repository"

export async function retrievePageUseCase(pageId: string): Promise<ReturnPageDto> {
	const page: Page = await retrievePage(pageId)

	return page.toOutputDto()
}
