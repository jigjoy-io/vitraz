import { putPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"


/**
 * Updates a page by sending a PUT request with the updated page data and returns the updated page.
 * @param {Page} page - The page object to be updated.
 * @returns {Promise<Page>} A promise that resolves to the updated page object.
 */
export async function updatePage(
	page: Page
): Promise<Page> {
	// use the adapter to call the database
	const updatedPage: PageProps = await putPage(
		page.toInputDto()
	)
	return Page.toDomain(updatedPage)
}