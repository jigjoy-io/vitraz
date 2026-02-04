import React from "react"
import { signOut } from "aws-amplify/auth"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { accountUpdated } from "../../../../reducers/auth-reducer"

export default function LogoutButton() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = async () => {
		try {
			await signOut()
			dispatch(
				accountUpdated({
					authorized: false,
					account: null,
				}),
			)
			navigate({ to: "/" })
		} catch (error) {
			console.error("LOG Error signing out: ", error)
		}
	}

	return (
		<button
			className="p-1 px-2 text-left text-gray-700 transition-colors duration-200 hover:bg-primary-light rounded-[5px]"
			onClick={handleLogout}
		>
			Logout
		</button>
	)
}
