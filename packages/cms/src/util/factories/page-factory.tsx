// src/util/factories/page-factory.tsx
import React from "react"
import CarouselPage from "../../components/carousel/carousel-page"
import BlankPage from "../../components/page/blank-page"
import PageContent from "../../components/page-content" // Make sure this import path is correct

interface PageProps {
	type: string
	id: string
	config?: any
	[key: string]: any
}

export class PageFactory extends React.Component {
	static layouts: { [key: string]: { component: React.ComponentType<any> } } = {
		carousel: {
			component: CarouselPage,
		},
		blank: {
			component: BlankPage,
		},
	}

	static get(props: PageProps) {
		if (!props || !props.type) {
			console.warn("Invalid props passed to PageFactory.get:", props)
			return null
		}

		const layout = this.layouts[props.type]
		if (!layout || !layout.component) {
			console.warn(`No component found for type: ${props.type}`)
			return <PageContent {...props} /> // Fallback to PageContent if no specific layout
		}

		const Component = layout.component
		return <Component {...props} />
	}
}
