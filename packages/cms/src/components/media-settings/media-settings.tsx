import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import { updateBlock } from "../../reducers/page-reducer"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../../util/click-outside-listener"
import Tabs from "../tabs/tabs"
import Tab from "../tabs/tab"
import FileUploader from "../file-uploader/file-uploader"
import TemplateFactory from "../../util/factories/templates/template-factory"
import FileUrlEditor from "../file-uploader/file-url-editor"

interface LocalizationStrings {
	create: string
	update: string
	embedLink: string
	embedLinkPlaceholder: string
	embedButton: string
	uploadFile: string
	clickToUpload: string
	fileTooLarge: string
	fileUploadedSuccessfully: string
	uploadInProgress: string
	uploadError: string
	clickToAdd: string
}

interface MediaSettingsProps {
	mediaType: "image" | "audio" | "video"
	icon: React.ReactNode
	localization: LocalizationStrings
	lang: string
	props: any
}

export default function MediaSettings({ mediaType, icon, localization, props }: MediaSettingsProps) {
	const [display, setDisplay] = useState(props.display)
	const [value, setValue] = useState(props.value)

	const dispatch = useDispatch()

	const [top, setTop] = useState<number>()
	const [left, setLeft] = useState<number>()

	const [y, setY] = useState(0)
	const ref = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (ref.current) {
			let contentRect = ref.current.getBoundingClientRect()
			if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
				setY(-100)
			} else {
				setY(0)
			}
			setTop(contentRect.top)
			setLeft(contentRect.left + contentRect.width / 2)
		}
	}, [display])

	const openConfigurer = () => {
		setDisplay(true)
		dispatch(blockingUpdated(true))
	}

	const turnOffPopup = () => {
		let block = JSON.parse(JSON.stringify(props))
		block.display = false
		dispatch(updateBlock(block))
	}

	const onClose = () => {
		dispatch(blockingUpdated(false))
		setDisplay(false)
		turnOffPopup()
	}

	useEffect(() => {
		window.onbeforeunload = function () {
			turnOffPopup()
			return true
		}

		return () => {
			window.onbeforeunload = null
		}
	}, [])

	const createBlock = (fileUrl) => {
		dispatch(blockingUpdated(false))

		let block = TemplateFactory.createMediaBlock(fileUrl, mediaType)

		block.id = props.id
		dispatch(updateBlock(block))
	}

	return (
		<div>
			{display &&
				createPortal(
					<ClickOutsideListener callback={onClose}>
						<div
							style={{
								width: 400,
								pointerEvents: "auto",
								top: top,
								left: left,
								transform: `translate(-50%, ${y}%)`,
							}}
							className="fixed bg-[white] rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50"
						>
							<div className="p-4">
								<div>
									<Tabs>
										<Tab key={localization.uploadFile}>
											<FileUploader mediaType={mediaType} localization={localization} callback={createBlock} />
										</Tab>
										<Tab key={localization.embedLink}>
											<FileUrlEditor filePath={value} fileType={mediaType} localization={localization} callback={createBlock} />
										</Tab>
									</Tabs>
								</div>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			<div ref={ref} onClick={openConfigurer} className="w-[100%] py-[8px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-[5px] flex items-center pl-5 hover:opacity-60">
				{icon}
				<div className="pl-2">{localization.clickToAdd}</div>
			</div>
		</div>
	)
}
