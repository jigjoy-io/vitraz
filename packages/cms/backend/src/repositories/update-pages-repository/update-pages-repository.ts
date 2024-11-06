import { putPages } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

export async function updatePages(pages: Page[]): Promise<Page[]> {
	// use the adapter to call the database
	const updatedPages: PageProps[] = await putPages(pages.map((page) => page.toInputDto()))
	return Page.toDomains(updatedPages)
}
