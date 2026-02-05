import React from "react"
import BlankPage from "../../components/page/blank-page"

export class PageFactory extends React.Component {
	static layouts: any = {
		blank: {
			component: BlankPage,
		},
	}

	static get(props: any) {
		let layout: any = this.layouts[props.type]
		return <layout.component {...props} key={props.id} />
	}
}
