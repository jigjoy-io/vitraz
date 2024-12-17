import { putPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

export async function createPage(page: Page): Promise<Page> {
	// use the adapter to call the database
	const createdPage: PageProps = await putPage(page.toInputDto())
	return Page.toDomain(createdPage)
}
