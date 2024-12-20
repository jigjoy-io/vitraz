import React, { lazy } from "react"

const Profile = lazy(() => import("ui-library/Profile"))

export default function ProfileBlock(props) {
	return (
		<div className="py-3">
			<Profile {...props} />
		</div>
	)
}
