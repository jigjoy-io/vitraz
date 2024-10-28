import React, { useState, useEffect, useRef } from "react"
import { getCurrentUser } from "aws-amplify/auth"
import ExpandDownIcon from "../../../icons/expand-down-icon"
import { createPortal } from "react-dom"
import { blockingUpdated } from "../../../reducers/toolbar-reducer"
import { useDispatch } from "react-redux"
import InitialIcon from "../../../icons/initial-icon"
import LogoutButton from "./logout/logout"
import LanguageSwitcher from "../../../shared/language-switcher/language-switcher"
import { useLanguage } from "../../../util/store"
import LocalizedStrings from "react-localization"
import ClickOutsideListener from "../../../util/click-outside-listener"

const localization = new LocalizedStrings({
	US: {
		languageSettings: "Language Settings",
		chooseLanguage: "Choose Language",
	},
	RS: {
		languageSettings: "Podešavanje jezika",
		chooseLanguage: "Odaberi jezik",
	},
})

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenSettings, setSettingsOpen] = useState(false)
	const [userEmail, setUserEmail] = useState("")
	const ref = useRef<HTMLDivElement>(null)
	const refLanguageSettings = useRef<HTMLButtonElement>(null)

	const [rect, setRect] = useState<null | any>(null)

	const lang = useLanguage()
	localization.setLanguage(lang)

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

	const openLanguageSettings = (event) => {
		setIsOpen(false)
		if (refLanguageSettings.current) setRect(refLanguageSettings.current.getBoundingClientRect())

		event.stopPropagation()
		dispatch(blockingUpdated(true))
		setSettingsOpen(true)
	}

	const handleSettingsClose = () => {
		dispatch(blockingUpdated(false))
		setSettingsOpen(false)
	}

	return (
		<div>
			<div>
				<button onClick={handleOpen} className="p-2 flex items-center justify-between text-gray-800 hover:bg-black-50 transition-colors duration-200">
					{userEmail && (
						<div className="flex flex-row items-center space-x-2 hover:bg-primary-light hover:bg-opacity-60 p-1 rounded-md" ref={ref}>
							<InitialIcon initials={userEmail[0].toUpperCase()} />
							<ExpandDownIcon />
						</div>
					)}
				</button>

				{isOpen &&
					createPortal(
						<ClickOutsideListener callback={handleClose}>
							<div className={`fixed flex rounded-md p-1 shadow bg-[white] w-[250px]`} style={{ top: rect.top + rect.height, left: rect.x }}>
								<div className="flex flex-col gap-1 w-full">
									<span className="p-1 px-2 font-medium text-sm truncate">{userEmail}</span>
									<div className="border-b border-primary" />
									<button ref={refLanguageSettings} className="p-1 px-2 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-primary-light rounded-md" onClick={openLanguageSettings}>
										{localization.languageSettings}
									</button>
									<LogoutButton />
								</div>
							</div>
						</ClickOutsideListener>,
						document.body,
					)}

				{isOpenSettings &&
					createPortal(
						<ClickOutsideListener callback={handleSettingsClose}>
							<div className={`fixed flex flex-col rounded-md p-3 gap-2 shadow bg-white w-[250px]`} style={{ top: rect.top, left: rect.x + rect.width }}>
								<p className="font-bold">{localization.chooseLanguage}</p>
								<LanguageSwitcher initial={lang} />
							</div>
						</ClickOutsideListener>,
						document.body,
					)}
			</div>
		</div>
	)
}
