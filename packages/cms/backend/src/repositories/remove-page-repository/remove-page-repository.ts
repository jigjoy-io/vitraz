import { deletePage } from "@adapters/secondary/database-adapter"

export async function removePage(
	id: any,
): Promise<void> {
	return await deletePage(id)
}
