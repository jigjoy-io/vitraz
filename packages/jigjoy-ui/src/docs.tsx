import React, { useState } from "react"
import Grid from "./components/grid"
import Item from "./components/item"
import docs, { Documentation } from "./docs-data"

function DocsOverview() {
	const [documentation, setDocumentation] = useState<Documentation>(docs[0])

	return (
		<div className="shadow rounded-[5px] min-h-[100vh]">
			<nav className="flex min-w-[240px]">
				<div className="p-10 min-h-[100vh] border-r-2 border-default-light">
					<p className="font-bold">Components</p>
					<Grid layout="column">
						{docs.map((doc) => (
							<Item selected={documentation.id == doc.id ? documentation.id : null} key={doc.id} id={doc.id} action={() => setDocumentation(doc)}>
								<div className="w-[200px] px-2">{doc.name}</div>
							</Item>
						))}
					</Grid>
				</div>

				<div className="p-20 flex-1">{documentation && <documentation.component />}</div>
			</nav>
		</div>
	)
}

export default DocsOverview
