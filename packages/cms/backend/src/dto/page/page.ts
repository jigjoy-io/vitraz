import { BlankPageConfig, CarouselPageConfig, PageType } from "@models/types"

export type PageDto = {
    id: string
    created: string
    updated: string
    type: PageType
    origin: string
    devConfig: BlankPageConfig | CarouselPageConfig
    prodConfig: BlankPageConfig | CarouselPageConfig | null
}

export type CreatePageDto = {
    id?: string
    created?: string
    updated?: string
    type: PageType
    origin: string
    config: BlankPageConfig | CarouselPageConfig
}

export type UpdatePageDto = {
    id: string
    created: string
    updated?: string
    type: PageType
    origin: string
    config: BlankPageConfig | CarouselPageConfig
}

export type ReturnPageDto = {
    id: string
    created: string
    updated: string
    type: PageType
    origin: string
    config: BlankPageConfig | CarouselPageConfig | null
}