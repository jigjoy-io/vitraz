import { Page } from "@domain/page/page"
import { ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { createPage } from "@repositories/create-page-repository"

export async function publishPageUseCase(page: UpdatePageDto): Promise<ReturnPageDto> {
	// update production config
	let productionPage: Page = Page.publish(page)

	await createPage(productionPage)

	return productionPage.toOutputDto()
}
