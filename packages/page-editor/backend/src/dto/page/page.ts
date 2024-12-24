import { BlankPageConfig, CarouselPageConfig, EnvironmentType, PageType } from "@models/types"

export type PageDto = {
	id: string
	created: string
	updated: string
	type: PageType
	environment: EnvironmentType
	linkedPageId: string | null
	name: string
	origin: string
	config: BlankPageConfig | CarouselPageConfig
}

export type CreatePageDto = {
	id?: string
	created?: string
	updated?: string
	type: PageType
	environment: EnvironmentType
	linkedPageId: string | null
	name: string
	origin: string
	config: BlankPageConfig | CarouselPageConfig
}

export type UpdatePageDto = {
	id: string
	created: string
	updated?: string
	name: string
	type: PageType
	environment: EnvironmentType
	linkedPageId: string | null
	origin: string
	config: BlankPageConfig | CarouselPageConfig
}

export type ReturnPageDto = {
	id: string
	created: string
	updated: string
	type: PageType
	name: string
	environment: EnvironmentType
	linkedPageId: string | null
	origin: string
	config: BlankPageConfig | CarouselPageConfig
}
