import { v4 as uuid } from 'uuid'

function refineBuildingBlocks(block: any) {
    for (let i = 0; i < block.buildingBlocks.length; i++) {
        block.buildingBlocks[i] = replaceIds(block.buildingBlocks[i])
    }
    return block
}

function refinePages(block: any) {
    for (let i = 0; i < block.pages.length; i++) {
        block.pages[i] = replaceIds(block.pages[i])
    }

    return block
}

function replaceIds(block){
    block.id = uuid()

    if (block.type == 'blank') {
        block = refineBuildingBlocks(block)
    }else if(block.type == 'carousel'){
        block = refinePages(block)
    }else if (block.type == 'page-tile'){
        block.page = replaceIds(block.page)
    }else if (block.type == 'carousel-tile'){
        block.page = replaceIds(block.page)
    }
    return block
}

export function duplicateBlock(block: any) {
    let newBlock = JSON.parse(JSON.stringify(block))
    newBlock = replaceIds(newBlock)
    return newBlock
}