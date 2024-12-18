import React, { useState, useEffect, useRef } from "react"
import { getCurrentUser } from "aws-amplify/auth"
import ExpandDownIcon from "../../../icons/expand-down-icon"
import { createPortal } from "react-dom"
import { blockingUpdated } from "../../../reducers/editor-reducer"
import { useDispatch } from "react-redux"
import InitialIcon from "../../../icons/initial-icon"
import LogoutButton from "./logout/logout"
import ClickOutsideListener from "../../../util/click-outside-listener"

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [userEmail, setUserEmail] = useState("")
	const ref = useRef<HTMLDivElement>(null)

	const [rect, setRect] = useState<null | any>(null)

	const dispatch = useDispatch()

	useEffect(() => {
		fetchUserEmail()
	}, [])

	const fetchUserEmail = async () => {
		try {
			const user = await getCurrentUser()
			const { username, signInDetails } = user
			setUserEmail(signInDetails?.loginId || username)
		} catch (error) {
			console.error("Error fetching user:", error)
		}
	}

	const handleOpen = () => {
		setIsOpen(true)

		if (ref.current) setRect(ref.current.getBoundingClientRect())

		dispatch(blockingUpdated(true))
	}

	const handleClose = () => {
		setIsOpen(false)
		dispatch(blockingUpdated(false))
	}

	return (
		<div>
			<div>
				<button
					onClick={handleOpen}
					className="p-2 flex items-center justify-between text-gray-800 hover:bg-black-50 transition-colors duration-200"
				>
					{userEmail && (
						<div
							className="flex flex-row items-center space-x-2 hover:bg-primary-light hover:bg-opacity-60 p-1 rounded-[5px]"
							ref={ref}
						>
							<InitialIcon initials={userEmail[0].toUpperCase()} />
							<ExpandDownIcon />
						</div>
					)}
				</button>

				{isOpen &&
					createPortal(
						<ClickOutsideListener callback={handleClose}>
							<div
								className={`fixed flex rounded-[5px] p-1 shadow bg-[white] w-[250px]`}
								style={{ top: rect.top + rect.height, left: rect.x }}
							>
								<div className="flex flex-col gap-1 w-full">
									<span className="p-1 px-2 font-medium truncate">{userEmail}</span>
									<div className="border-b border-primary" />
									<LogoutButton />
								</div>
							</div>
						</ClickOutsideListener>,
						document.body,
					)}
			</div>
		</div>
	)
}
