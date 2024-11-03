import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import ClickOutsideListener from "../../util/click-outside-listener"
import { updateBlock } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { useLanguage } from "../../util/store"
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import { createPortal } from "react-dom"
import LocalizedStrings from "react-localization"
import TemplateFactory from "../../util/factories/templates/template-factory"
import InputIcon from "../../icons/input-icon"
import Button from "../button/button"

let localization = new LocalizedStrings({
	US: {
		create: "Create",
		placeholder: "Placeholder",
		label: "Label",
		textInput: "Text input",
		dateInput: "Date input",
		numberInput: "Number input",
		inputType: "Input type",
		clickToAdd: "Click to add an input",
	},
	RS: {
		create: "Kreiraj",
		placeholder: "Poruka za unos",
		label: "Oznaka",
		textInput: "Unose teksta",
		dateInput: "Unos datuma",
		numberInput: "Unos broja",
		inputType: "Tip unosa",
		clickToAdd: "Klikni da ubaciš polje za unos",
	},
})

export default function InputConfigurer(props: any) {
	const dispatch = useDispatch()

	const [display, setDisplay] = useState(props.display)
	const [placeholder, setPlaceholder] = useState(props.placeholder)
	const [label, setLabel] = useState(props.label)
	const [inputType, setInputType] = useState(props.inputType)

	const lang = useLanguage()

	const [top, setTop] = useState<number>()
	const [left, setLeft] = useState<number>()
	const [y, setY] = useState<number>()

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		localization.setLanguage(lang)

		window.onbeforeunload = function () {
			turnOffPopup()
			return true
		}

		return () => {
			window.onbeforeunload = null
		}
	}, [])

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

	/**
	 * Creates a new page block and replace page configurer block with newly created page tile.
	 * Dispatches an action to replace the existing block with the new block.
	 * @returns None
	 */
	const create = () => {
		dispatch(blockingUpdated(false))

		let block = TemplateFactory.createInputBlock()
		block.placeholder = placeholder
		block.label = label
		block.inputType = inputType

		// replace configurer with carousel block tile
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

	return (
		<div>
			{display &&
				createPortal(
					<ClickOutsideListener callback={onClose}>
						<div
							className="fixed bg-[white] rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50"
							style={{
								width: 400,
								pointerEvents: "auto",
								top: top,
								left: left,
								transform: `translate(-50%, ${y}%)`,
							}}
						>
							<div className="p-[5%]">
								<div className="w-[100%] mt-[1rem]">
									<div className="flex flex-row w-full">
										<label className="flex-none flex items-center w-[33%]" htmlFor="inputType">
											{localization.inputType}
										</label>
										<select name="inputType" id="inputType" className="ml-4 py-2 rounded-[5px] w-full focus:outline-0" onChange={(e) => setInputType(e.target.value)} value={inputType}>
											<option value="text">{localization.textInput}</option>
											<option value="number">{localization.numberInput}</option>
											<option value="date">{localization.dateInput}</option>
										</select>
									</div>
								</div>

								<div className="w-[100%] mt-[1rem]">
									<div className="flex flex-row w-full">
										<label className="flex-none flex items-center w-[33%]" htmlFor="label">
											{localization.label}
										</label>
										<input className="ml-4 p-1 rounded-[5px] border w-[100%]" value={label} onChange={(e: any) => setLabel(e.target.value)} />
									</div>
								</div>
								<div className="w-[100%] mt-[1rem]">
									<div className="flex flex-row w-full">
										<label className="flex-none flex items-center w-[33%]" htmlFor="placeholder">
											{localization.placeholder}
										</label>
										<input className="ml-4 p-1 rounded-[5px] border w-[100%]" value={placeholder} onChange={(e: any) => setPlaceholder(e.target.value)} />
									</div>
								</div>

								<div className="mt-[1rem]">
									<Button width="w-full" text={localization.create} action={create} />
								</div>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}
			<div ref={ref} onClick={openConfigurer} className="w-[100%] py-[8px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-[5px] flex items-center pl-5 hover:opacity-60">
				<InputIcon />
				<div className="pl-2">{localization.clickToAdd}</div>
			</div>
		</div>
	)
}
