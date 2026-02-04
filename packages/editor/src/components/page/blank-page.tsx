import React from "react"
import { usePage } from "../../util/store"
import Content from "../page-content"

export default function BlankPage() {
	const page: any = usePage()

	return (
		<>
			{page.config && (
				<div className="flex grow h-[100%] min-h-[100%] w-[100%] justify-center">
					<div className="flex flex-col w-full items-center p-3">
						<div className="grow min-w-full md:min-w-[360px]">
							<Content config={page.config} key={page.id} id={page.id} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
