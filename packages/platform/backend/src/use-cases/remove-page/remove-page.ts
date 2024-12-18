import { removePage } from "@repositories/remove-page-repository"

export async function removePageUseCase(id: string): Promise<void> {
	return await removePage(id)
}
