import { Page } from "@domain/page/page"
import { ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { retrievePage } from "@repositories/retrieve-page-repository"
import { updatePage } from "@repositories/update-page-repository/update-page-repository"

/**
 * Updates a page based on the provided UpdatePageDto.
 * @param {UpdatePageDto} page - The page data to update.
 * @returns {Promise<ReturnPageDto>} A promise that resolves to the updated page data.
 */
export async function updatePageUseCase(page: UpdatePageDto): Promise<ReturnPageDto> {
	// throws error if page not exists
	const retrievedPage: Page = await retrievePage(page.id)

	// validates new page schema
	let pageToUpdate: Page = Page.update(page, retrievedPage)

	// save new page
	let updatedPage = await updatePage(pageToUpdate)

	return updatedPage.toOutputDto()
}
