import React from "react"
import { v4 as uuidv4 } from 'uuid'
import { templates } from "../util/templates"

export default class TemplateFactory extends React.Component {


    static create(type: string) {
        let block: any = templates[type]
        let template = JSON.parse(JSON.stringify(block))
        template.id = uuidv4()
        return template
    }

    static createBlockSelector() {
        return this.create('block-selector')
    }

    static createTextBlock(text) {
        let textBlock = this.create('text')
        textBlock.text = text
        return textBlock
    }

    static createBlankPage(origin) {
        let blankPage = this.create('blank')
        let selector = this.createBlockSelector()
        blankPage.config.buildingBlocks.push(selector)
        blankPage.origin = origin
        return blankPage

    }

    static createCarouselPage(origin, numberOfPages = 3) {

        let page = this.create("carousel")
        page.origin = origin
        let pages: any = []

        // create carousel inner pages
        for (let i = 0; i < numberOfPages; i++) {
            let innerPage = this.createBlankPage(page.id)
            pages.push(innerPage)
        }


        page.config = {
            pages: pages
        }

        return page
    }

    static createPage(type, origin) {

        if (type == 'carousel')
            return this.createCarouselPage(origin)
        
        if (type == 'blank')
            return this.createBlankPage(origin)

        throw('Page not supported')
    }

    static createCarouselTileBlock(origin, numberOfPages = 3) {
        let block = this.create('carousel-tile')
        let page = this.createCarouselPage(origin, numberOfPages)

        block.page = page

        return block
    }

    static createPageTileBlock(origin) {

        let block = this.create('page-tile')
        let page = this.createBlankPage(origin)

        block.page = page

        return block
    }

    static createTile(type, origin) {


        if (type != 'carousel-tile' && type != 'page-tile')
            throw ('Page not supported')

        let block: any = null
        if(type == 'carousel-tile')
            block = this.createCarouselTileBlock(origin)
        
        if (type == 'page-tile')
            block = this.createPageTileBlock(origin)


        block.title = 'Title'
        block.description = 'Description...'

        return block
    }
    
}