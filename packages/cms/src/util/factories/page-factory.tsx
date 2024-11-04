import React from "react"
import CarouselPage from "../../components/carousel/carousel-page"
import BlankPage from "../../components/page/blank-page"

export class PageFactory extends React.Component {
	static layouts: any = {
		carousel: {
			component: CarouselPage,
		},
		blank: {
			component: BlankPage,
		},
	}

	static get(props: any) {
		let layout: any = this.layouts[props.type]
		console.log("PROPS", props)
		console.log("LAYOUT", layout)
		return <layout.component {...props} key={props.id} />
	}
}
