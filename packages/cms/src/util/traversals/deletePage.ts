
function deleteFromBlankPage(page: any, blockId: any) {
    //page.config.buildingBlocks = page.config.buildingBlocks.filter((block: any) => block.page?.id !== blockId)

    let filtered: any[] = []
    page.config.buildingBlocks.forEach(block => {
        if (block.type == 'carousel-tile' || block.type == 'page-tile') {
            if (block.page.id !== blockId) {
                block.page = deletePage(block.page, blockId)
                filtered.push(block)
            }
        } else {
            filtered.push(block)
        }

    })

    page.config.buildingBlocks = filtered
    return page
}

function deleteFromCarouselPage(page: any, blockId: any) {

    let filtered: any[] = []
    for (let i = 0; i < page.config.pages.length; i++) {
        if (page.config.pages[i].id !== blockId) {
            page.config.pages[i] = deleteFromBlankPage(page.config.pages[i], blockId)
            filtered.push(page.config.pages[i])
        }

    }

    page.config.pages = filtered

    return page
}
export function deletePage(page: any, blockId: any) {

    //TODO: REMOVE AFTER REFACTORE
    delete page.root
    delete page.ident
    delete page.mode

    if (page.type == 'blank') {

        page = deleteFromBlankPage(page, blockId)
    } else if (page.type == 'carousel') {
        page = deleteFromCarouselPage(page, blockId)
    }
    return page
}