import React, { lazy, Suspense } from "react"

const Profile = lazy(() => import("@jigjoy-ui/profile"))

export default function ProfileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Profile {...props} />
			</Suspense>
		</div>
	)
}
