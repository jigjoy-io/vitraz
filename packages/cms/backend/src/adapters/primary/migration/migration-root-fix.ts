import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { createPageUseCase } from '@use-cases/create-page'
import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'

export async function migrateRootFixHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["17d2246b-3684-485b-b710-ce613cc406a0"]

        const createNewBlock = (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            if (b.type == "carousel-tile" || b.type == "page-tile") {
                b.page = createNewPage(b.page)               
            }

            return b
        }

        const createNewPage = (page: any) => {
            let p: any =  JSON.parse(JSON.stringify(page))
            delete p.root
            delete p.ident
            delete p.mode

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: page.config.buildingBlocks.map(createNewBlock)
                }
            }else if (p.type =="carousel"){
                p.config = {
                    pages: page.config.pages.map(createNewPage)
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