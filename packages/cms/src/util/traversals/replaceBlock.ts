
function traversBlankPage(page: any, block: any) {
    for (let i = 0; i < page.buildingBlocks.length; i++) {
        if(page.buildingBlocks[i].id == block.id){
            page.buildingBlocks[i] = block
            return page
        }else if (page.buildingBlocks[i].type == 'page-tile'){
            page.buildingBlocks[i].page = traversPage(page.buildingBlocks[i].page, block)
        }else if (page.buildingBlocks[i].type == 'carousel-tile'){
            page.buildingBlocks[i].page = traversCarouselPage(page.buildingBlocks[i].page, block)
        }
    }
    return page
}

function traversCarouselPage(page: any, block: any) {
    for (let i = 0; i < page.pages.length; i++) {
        if(page.pages[i].id == block.id){
            page.pages[i] = block
            return page
        }else{
            page.pages[i] = traversPage(page.pages[i], block)
        }
    }

    return page
}

function traversPage(page, block){
    if(page.id == block.id){
        page = block
        return page
    }
    else if (page.type == 'blank') {
        page = traversBlankPage(page, block)
    }else if(page.type == 'carousel'){
        page = traversCarouselPage(page, block)
    }
    return page
}

export function replaceBlock(page: any, block: any) {
    let newPage = traversPage(page, block)
    return newPage
}