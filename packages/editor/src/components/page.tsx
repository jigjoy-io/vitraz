import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../util/factories/page-factory"

function Page() {
	const page = usePage()

	return <div className="flex flex-col h-full justify-center items-center">{page != null && PageFactory.get(page)}</div>
}

export default Page
