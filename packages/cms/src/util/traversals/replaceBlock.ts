
function traversBlankPage(page: any, block: any) {
    for (let i = 0; i < page.config.buildingBlocks.length; i++) {
        if (page.config.buildingBlocks[i].id == block.id) {
            page.config.buildingBlocks[i] = block
            return page
        } else if (page.config.buildingBlocks[i].type == 'page-tile' || page.config.buildingBlocks[i].type == 'carousel-tile') {
            page.config.buildingBlocks[i].page = traversPage(page.config.buildingBlocks[i].page, block)
        }
    }
    return page
}

function traversCarouselPage(page: any, block: any) {
    for (let i = 0; i < page.config.pages.length; i++) {
        if (page.config.pages[i].id == block.id) {
            //TODO: REMOVE AFTER REFACTORE
            delete page.config.pages[i].root
            delete page.config.pages[i].ident
            delete page.config.pages[i].mode
            page.config.pages[i] = block
            return page
        } else {
            page.config.pages[i] = traversPage(page.config.pages[i], block)
        }
    }

    return page
}

function traversPage(page, block) {

    //TODO: REMOVE AFTER REFACTORE
    delete page.root
    delete page.ident
    delete page.mode

    delete block.root
    delete block.ident
    delete block.mode

    if (page.id == block.id) {
        page = block
        return page
    }
    else if (page.type == 'blank') {
        page = traversBlankPage(page, block)
    } else if (page.type == 'carousel') {
        page = traversCarouselPage(page, block)
    }
    return page
}

export function replaceBlock(page: any, block: any) {

    let newPage = traversPage(page, block)
    return newPage
}