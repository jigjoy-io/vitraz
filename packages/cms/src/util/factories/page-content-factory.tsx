import React from "react"
import ViewPageContent from "./view-page-content"
import EditPageContent from "./edit-page-content"

export default class PageContentFactory {
	static getPageContent(mode: string, props: any) {
		if (mode === "editing") {
			return <EditPageContent {...props} />
		}
		return <ViewPageContent {...props} />
	}
}
