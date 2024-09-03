
import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { EnvironmentType } from "@models/types"
import { retrievePage } from "@repositories/retrieve-page-repository"
import { updatePage } from "@repositories/update-page-repository/update-page-repository"

export async function publishPageUseCase(pageId: string): Promise<ReturnPageDto> {

    const page: Page = await retrievePage(pageId)

    // update production config
    let pageToUpdate: Page = Page.publish(page)

    // save new page
    let updatedPage = await updatePage(pageToUpdate)

    return updatedPage.toOutputDto(EnvironmentType.Development)
}