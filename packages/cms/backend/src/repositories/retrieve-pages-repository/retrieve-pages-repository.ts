import { getPages } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page"
import { PageProps } from "@models/types"

export async function retrievePages(origin: string): Promise<Page[]> {
	const pages: PageProps[] = await getPages(origin)

	return Page.toDomains(pages)
}
