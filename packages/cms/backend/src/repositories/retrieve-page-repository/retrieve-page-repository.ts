import { getPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page"
import { PageNotFoundError } from "@errors/page-not-found-error"
import { PageProps } from "@models/types"

/**
 * Retrieves a page with the given pageId and returns a Promise that resolves to a Page object.
 * @param {string} pageId - The unique identifier of the page to retrieve.
 * @returns {Promise<Page>} A Promise that resolves to a Page object representing the retrieved page.
 */
export async function retrievePage(
	pageId: string
): Promise<Page> {

	const retrievedPage: PageProps = await getPage(
		pageId
	)

    if(Object.keys(retrievedPage).length === 0)
        throw new PageNotFoundError(`Page with id: ${pageId} is not found`)
        
	return Page.toDomain(retrievedPage)
}