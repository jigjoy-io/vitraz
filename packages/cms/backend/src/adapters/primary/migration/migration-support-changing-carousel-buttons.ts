import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'

export async function migrateNavigationButtonsHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["c94a4e7b-eeba-4a8c-8a73-02cd08d1dc6a"]

        const createNewBlock = (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            if (b.type == "carousel-tile" || b.type == 'page-tile') {
                b.page = createNewPage(b.page)
            }

            return b
        }

        const createNewPage = (page: any) => {
            let p: any =  JSON.parse(JSON.stringify(page))

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: page.config.buildingBlocks.map(createNewBlock)
                }
            }else if (p.type =="carousel"){
                p.config.buttons = {
                    previous: 'Previous',
                    next: "Next",
                    home: "Back to home"
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]

            let page: any = await retrievePageUseCase(pageId)

            console.log(page)

            page = createNewPage(page)

            console.log(page)

            await updatePageUseCase(page)
        }


        return {
            statusCode: 201,
            body: JSON.stringify({}),
        }

    } catch (error) {
        return errorHandler(error)
    }
}