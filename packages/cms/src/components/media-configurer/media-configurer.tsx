import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import TemplateFactory from "../../util/factories/templates/template-factory"
import { updateBlock } from "../../reducers/page-reducer"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../../util/click-outside-listener"
import Tabs from "../tabs/tabs"
import Tab from "../tabs/tab"
import Input from "../input/input"
import Button from "../button/button"
import useFileUpload from "../../util/file-upload"
import { fileUpdate } from "../../util/file-update"
import Alert from "../alert/alert"

interface LocalizationStrings {
	create: string
	update: string
	embedLink: string
	embedLinkPlaceholder: string
	embedButton: string
	uploadFile: string
	clickToUpload: string
	maxFileUpload: string
	fileTooLarge: string
	fileLoadSuccess: string
	fileUploadedSuccessfully: string
	uploadInProgress: string
	uploadError: string
	clickToAdd: string
}

interface MediaConfigurerProps {
	mediaType: "image" | "audio" | "video"
	icon: React.ReactNode
	localization: LocalizationStrings
	lang: string
	props: any
}

export default function MediaConfigurer({ mediaType, icon, localization, props, lang }: MediaConfigurerProps) {

	const [display, setDisplay] = useState(props.display)
	const [value, setValue] = useState(props.value)
	const fileInputRef = useRef<HTMLInputElement>(null)

    const [fileAlert, setFileAlert] = useState<any>(null)

	const dispatch = useDispatch()

	const { handleFileUpload } = useFileUpload(setValue, mediaType)
	const { update, loading } = fileUpdate(props.block, setFileAlert, localization)

	const triggerFileInput = () => {
		fileInputRef.current?.click()
	}

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
			setLeft(contentRect.left + contentRect.width/2)
		}
	}, [display])

	const openConfigurer = () => {
		setDisplay(true)
		dispatch(blockingUpdated(true))
	}

	const createBlock = (fileUrl) => {
		dispatch(blockingUpdated(false))
		let block = TemplateFactory.createMediaBlock(fileUrl, mediaType)

		block.id = props.id
		dispatch(updateBlock(block))
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

	const handleFileChange = async (event) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			if (selectedFile.size > 5 * 1024 * 1024) {
				setFileAlert({ type: "danger", message: localization.fileTooLarge })
			} else {
				const uploadedFileUrl = await update(selectedFile, handleFileUpload, value)
				createBlock(uploadedFileUrl)
			}
		}
	}

	return (
		<div>
			{display && createPortal(
				<ClickOutsideListener callback={onClose}>
					<div
						style={{
							width: 460,
							pointerEvents: 'auto',
							top: top,
							left: left,
							transform: `translate(-50%, ${y}%)`
						}}
						className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50"
					>
						<div className="p-[5%]">
							<div>
								<Tabs>
									<Tab key={localization.uploadFile}>
										{
											fileAlert && <div className="mb-2">
											<Alert type={fileAlert.type} message={fileAlert.message} />
										</div>
										}
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleFileChange}
											accept={`${mediaType}/*`}
											style={{ display: 'none' }}
										/>
										<Button width="w-full" text={localization.clickToUpload} action={triggerFileInput} disabled={fileAlert != null && fileAlert.type != 'danger'} />
									</Tab>
									<Tab key={localization.embedLink}>
										<Input value={value} onChange={setValue} placeholder={localization.embedLinkPlaceholder} />
										<div className="mt-3">
											<Button width="w-full" text={localization.embedButton} action={() => createBlock(value)} />
										</div>
									</Tab>
								</Tabs>
							</div>
						</div>
					</div>
				</ClickOutsideListener>, document.body)}

			<div
				ref={ref}
				onClick={openConfigurer}
				className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5 hover:opacity-60"
			>
				{icon}
				<div className="pl-2">{localization.clickToAdd}</div>
			</div>
		</div>
	)

}