import { Page } from "@domain/page/page"
import { CreatePageDto, ReturnPageDto } from "@dto/page/page"
import { createPage } from "@repositories/create-page-repository"

/**
 * Converts page creation dto object into page domain object and passes it to repository for creation.
 * @param {CreatePageDto} page - The data for creating the new page.
 * @returns {Promise<ReturnPageDto>} A promise that resolves to the ReturnPageDto of the created page.
 */
export async function createPageUseCase(page: CreatePageDto): Promise<ReturnPageDto> {
	const newPage = Page.create(page)

	const createdPage: Page = await createPage(newPage)
	return createdPage.toOutputDto()
}
