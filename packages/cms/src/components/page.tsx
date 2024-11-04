// src/components/page.tsx
import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../util/factories/page-factory"
import PageContent from "./page-content" // Make sure this import path is correct

function Page() {
	const page = usePage()

	if (!page) return null

	try {
		return <div className="flex flex-col h-full justify-center items-center">{PageFactory.get(page) || <PageContent {...page} />}</div>
	} catch (error) {
		console.error("Error rendering page:", error)
		return <PageContent {...page} /> // Fallback to PageContent
	}
}

export default Page
