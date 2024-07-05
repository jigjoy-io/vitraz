export enum PageType {
    Blank = 'blank',
    Carousel = 'carousel',
}

export enum EnvironmentType {
    Production = 'production',
    Development = 'development'
}

export type BlankPageConfig = {
    buildingBlocks: any[]
}

export type CarouselPageConfig = {
    pages: string[]
}

export type CreatePageProps = {
    id?: string
    created?: string
    updated?: string
    type: PageType
    origin: string
    devConfig: BlankPageConfig | CarouselPageConfig
    prodConfig: BlankPageConfig | CarouselPageConfig | null
}

export type UpdatePageProps = {
    id: string
    created: string
    updated?: string
    type: PageType
    origin: string
    devConfig: BlankPageConfig | CarouselPageConfig
    prodConfig: BlankPageConfig | CarouselPageConfig | null
}

export type PageProps = {
    id: string
    created: string
    updated: string
    type: PageType
    origin: string
    devConfig: BlankPageConfig | CarouselPageConfig
    prodConfig: BlankPageConfig | CarouselPageConfig | null
}

export type UnmarsalledPage = {
    id: string
    created: string
    updated: string
    type: PageType
    origin: string
    devConfig: BlankPageConfig | CarouselPageConfig
    prodConfig: BlankPageConfig | CarouselPageConfig | null
}


