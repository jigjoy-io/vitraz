
function deleteFromBlankPage(page: any, blockId: any) {
    page.config.buildingBlocks = page.config.buildingBlocks.filter((block: any) => block.id !== blockId)
    return page
}

function deleteFromCarouselPage(page: any, blockId: any) {

    for (let i = 0; i < page.config.pages.length; i++) {
        page.config.pages[i].config.buildingBlocks = page.config.pages[i].config.buildingBlocks.filter((b: any) => b.id !== blockId)
    }

    return page
}
export function deleteBlock(page: any, blockId: any) {

    if (page.type == 'blank') {
        page = deleteFromBlankPage(page, blockId)
    } else if (page.type == 'carousel') {
        page = deleteFromCarouselPage(page, blockId)
    }
    return page
}