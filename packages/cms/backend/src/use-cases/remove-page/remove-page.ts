import { Page } from "@domain/page"
import { ReturnPageDto } from "@dto/page"
import { EnvironmentType } from "@models/types"
import { retrievePage } from "@repositories/retrieve-page-repository"

export async function removePageUseCase(pageId: string): Promise<ReturnPageDto> {

    //throws error if page doesn't exist
    const page: Page = await retrievePage(pageId)



    return page.toOutputDto(EnvironmentType.Development)
}