import { v4 as uuidv4 } from 'uuid'
import { TemplatesStorage } from "./templates"

export default class TemplateFactory {

    static create(type: string) {
        let templates = TemplatesStorage.getTemplates()

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

    static createImageBlock(fileUrl) {
        let imageBlock = this.create('image')
        imageBlock.source = fileUrl
        return imageBlock
    }

    static createAudioBlock(fileUrl) {
        let audioBlock = this.create('audio')
        audioBlock.source = fileUrl
        return audioBlock
    }

    static createReelBlock(fileUrl) {
        let reelBlock = this.create('reel')
        reelBlock.source = fileUrl
        return reelBlock
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


        page.config.pages = pages

        return page
    }

    static createPage(type, origin) {

        if (type == 'carousel')
            return this.createCarouselPage(origin)

        if (type == 'blank')
            return this.createBlankPage(origin)

        throw ('Page not supported')
    }

    static createMediaBlock(uploadedFileUrl: null | undefined, mediaType: string) {
        if (mediaType === "audio") {
            return TemplateFactory.createAudioBlock(uploadedFileUrl)
          }
          if (mediaType === "image") {
            return TemplateFactory.createImageBlock(uploadedFileUrl)
          }
          if (mediaType === "video") {
            return TemplateFactory.createReelBlock(uploadedFileUrl)
          }
      
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
        if (type == 'carousel-tile')
            block = this.createCarouselTileBlock(origin)

        if (type == 'page-tile')
            block = this.createPageTileBlock(origin)

        return block
    }

}