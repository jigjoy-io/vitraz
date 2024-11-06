import { putPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

export async function updatePage(page: Page): Promise<Page> {
	// use the adapter to call the database
	const updatedPage: PageProps = await putPage(page.toInputDto())
	return Page.toDomain(updatedPage)
}
