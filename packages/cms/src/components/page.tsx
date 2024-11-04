import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../util/factories/page-factory"

function Page() {
	const page = usePage()

	return <div className="flex flex-col h-full justify-center items-center">{page != null && PageFactory.get(page)}</div>
}

export default Page

// import React from "react"
// import { usePage } from "../util/store"
// import DndPageWrapper from "../util/factories/dnd-page-wrapper"
// import { useBlocked } from "../util/store"

// function Page() {
// 	const blocked = useBlocked()
// 	const page = usePage()

// 	if (!page) return null

// 	console.log("Page data:", page)

// 	return (
// 		<div className="flex flex-col h-full justify-center items-center" style={{ pointerEvents: blocked ? "none" : "auto" }}>
// 			<DndPageWrapper />
// 		</div>
// 	)
// }

// export default Page
