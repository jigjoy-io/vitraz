
function traversBlankPage(page: any, innerPage: any, parent) {
    for (let i = 0; i < page.config.buildingBlocks.length; i++) {
        if (page.config.buildingBlocks[i].type == 'page-tile' || page.config.buildingBlocks[i].type == 'carousel-tile') {
            if (page.config.buildingBlocks[i].page.id == innerPage.id) {
                return page
            }
        }
    }

    for (let i = 0; i < page.config.buildingBlocks.length; i++) {
        if (page.config.buildingBlocks[i].type == 'page-tile' || page.config.buildingBlocks[i].type == 'carousel-tile') {
            parent = traversePage(page.config.buildingBlocks[i].page, innerPage, parent)
        }

    }

    return parent
}

function traversCarouselPage(page: any, innerPage: any, parent) {
    for (let i = 0; i < page.config.pages.length; i++) {
        if (page.config.pages[i].id == innerPage.id) {
            return page
        }
    }

    for (let i = 0; i < page.config.pages.length; i++) {
        parent = traversePage(page.config.pages[i], innerPage, parent)
    }



    return parent
}

export function traversePage(page, innerPage, parent) {

    if (page.type == 'blank') {
        parent = traversBlankPage(page, innerPage, parent)
    } else if (page.type == 'carousel') {
        parent = traversCarouselPage(page, innerPage, parent)
    }

    return parent
}

export function findParent(page: any, innerPage: any) {
    return traversePage(page, innerPage, null)
}