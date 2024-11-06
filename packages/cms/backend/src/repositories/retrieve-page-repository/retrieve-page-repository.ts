import { getPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page"
import { PageNotFoundError } from "@errors/page-not-found-error"
import { PageProps } from "@models/types"

export async function retrievePage(pageId: string): Promise<Page> {
	const retrievedPage: PageProps = await getPage(pageId)

	if (Object.keys(retrievedPage).length === 0) throw new PageNotFoundError(`Page with id: ${pageId} is not found`)

	return Page.toDomain(retrievedPage)
}
