
import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { EnvironmentType } from "@models/types"
import { retrievePage } from "@repositories/retrieve-page-repository"

/**
 * Retrieves a page by its ID and returns a DTO representation based on the environment type.
 * @param {string} pageId - The ID of the page to retrieve.
 * @param {EnvironmentType} environement - The type of environment (e.g., development, production).
 * @returns {Promise<ReturnPageDto>} A promise that resolves to the DTO representation of the page.
 */
export async function retrievePageUseCase(pageId: string, environement: EnvironmentType): Promise<ReturnPageDto> {

    const page: Page = await retrievePage(pageId)

    return page.toOutputDto(environement)
}