import React, { useEffect, useState } from "react"
import { PageFactory } from "../util/factories/page-factory"

function Page(props) {
	const [page, setPage] = useState(props.page)

	useEffect(() => {
		setPage(props.page)
	}, [props.page])

	return <div className="flex flex-col h-full justify-center items-center">{page && PageFactory.get(page)}</div>
}

export default Page
