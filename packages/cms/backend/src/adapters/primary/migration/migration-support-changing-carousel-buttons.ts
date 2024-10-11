import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'
import { retrievePagesUseCase } from '@use-cases/retrieve-pages'

export async function migrateNavigationButtonsHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages: any [] = await retrievePagesUseCase('miodrag.todorovic@jigjoy.io')
        pages = pages.map(x => x.id)
        

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