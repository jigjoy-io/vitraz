import { putPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

/**
 * Repository function that converts Page domain object to valid page object and passes it to databse adapter for creation.
 * @param {Page} page - The page object to be created in the database.
 * @returns {Promise<Page>} A promise that resolves to the created page object.
 */
export async function createPage(
	page: Page
): Promise<Page> {
	// use the adapter to call the database
	const createdPage: PageProps = await putPage(
		page.toInputDto()
	)
	return Page.toDomain(createdPage)
}