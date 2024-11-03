import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPortal } from "react-dom"
import LocalizedStrings from "react-localization"
import { SelectorOptions } from "./selector-options"
import { useActiveBlock, useLanguage, usePage } from "../../../../util/store"
import { blockingUpdated } from "../../../../reducers/toolbar-reducer"
import TemplateFactory from "../../../../util/factories/templates/template-factory"
import { focusBlock, insertBlock } from "../../../../reducers/page-reducer"
import ClickOutsideListener from "../../../../util/click-outside-listener"
import Item from "../../../../components/item/item"
import { findPreviousTextBlock } from "../../../../util/text-utils/use-text-block"
import { handleTextBlockKeyDown } from "../../../../util/text-utils/text-block-key-handlers"

let localization = new LocalizedStrings({
	US: {
		selectorText: "Write something, or type '/' to insert...",
	},
	RS: {
		selectorText: "Napiši nešto ili unesi '/' da dodaš blok...",
	},
})

export default function BlockSelector(props: any) {
	const page = usePage()
	const lang = useLanguage()

	const [option, setOption] = useState("")
	const [options, setOptions] = useState([] as any)
	const [allOptions, setAllOptions] = useState([] as any)
	const [showMenu, setShowMenu] = useState(false)
	const [placeholder, setPlaceholder] = useState(localization.selectorText)
	const activeBlock = useActiveBlock()
	const inputRef = useRef<HTMLInputElement>(null)
	const [top, setTop] = useState(-500)
	const [left, setLeft] = useState()

	const dispatch = useDispatch()

	const previousTextBlock = useSelector(() => {
		const blocks = page.config.buildingBlocks
		return findPreviousTextBlock(blocks, props.id, ["text", "title", "heading", "block-selector"])
	})

	useEffect(() => {
		localization.setLanguage(lang)
		const selectorOptions = SelectorOptions.getOptions(lang)

		setOptions(page.type == "carousel" ? selectorOptions.filter((opt: any) => opt.key != "pages") : selectorOptions.filter((opt: any) => opt.key != "inputs"))
		setAllOptions(page.type == "carousel" ? selectorOptions.filter((opt: any) => opt.key != "pages") : selectorOptions.filter((opt: any) => opt.key != "inputs"))

		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (activeBlock == props.id) inputRef.current?.focus()
	}, [activeBlock])

	const filterCommands = (option: any, value: any, index: number) => {
		option.commands = allOptions[index].commands.filter((command: any) => command.label.toLowerCase().includes(value.slice(1).toLowerCase()))
		return option
	}

	function setMenuPosition() {
		if (inputRef.current) {
			let rect: any = inputRef.current.getBoundingClientRect()

			setLeft(rect.left + rect.width)

			if (rect.top + window.innerHeight / 2 > window.innerHeight) {
				setTop(rect.top)
				return rect.top
			} else {
				setTop(rect.bottom)
				return rect.bottom
			}
		}
	}

	useEffect(() => {
		setMenuPosition()
	}, [options])

	const calculateY = () => {
		if (inputRef.current) {
			let rect: any = inputRef.current.getBoundingClientRect()
			if (rect.top + window.innerHeight / 2 > window.innerHeight) {
				return 100
			} else {
				return 0
			}
		}
	}

	const handleChange = (event: any) => {
		setOption(event.target.value)

		if (event.target.value.startsWith("/")) {
			let comm = JSON.parse(JSON.stringify(allOptions))
			let temp = comm.map((option: any, index: number) => filterCommands(option, event.target.value, index))

			let result = temp.filter((option) => option.commands.length > 0)

			setOptions(result)
			setShowMenu(true)
			dispatch(blockingUpdated(true))
		} else {
			setShowMenu(false)
			dispatch(blockingUpdated(false))
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		handleTextBlockKeyDown({
			event,
			dispatch,
			blockId: props.id,
			blockType: "block-selector",
			ref: inputRef,
			options: {
				onClose: closeMenu,
				setOption: setOption,
			},
			previousBlock: previousTextBlock,
		})
	}

	const closeMenu = () => {
		dispatch(blockingUpdated(false))
		setShowMenu(false)
	}

	const insert = (event, type: string) => {
		dispatch(focusBlock(null))
		let block = TemplateFactory.create(type)

		dispatch(
			insertBlock({
				referenceBlock: props.id,
				block: block,
				position: "above",
			}),
		)

		dispatch(focusBlock(block.id))

		setOption("")
		closeMenu()
	}

	const handleLoseFocus = () => {
		dispatch(blockingUpdated(false))
		dispatch(focusBlock(null))
	}

	return (
		<div>
			{showMenu &&
				createPortal(
					<ClickOutsideListener callback={closeMenu}>
						<div style={{ top: top, left: left, transform: `translate(-100%, -${calculateY()}%)` }} className={`fixed flex flex-col w-[100%] md:max-w-[340px] h-auto max-h-[400px] overflow-y-auto bg-white shadow rounded-[5px] p-1 -translate-x-[100%]`}>
							{options.map((option: any, index) => (
								<div key={option.key}>
									{option.commands.map((command: any) => (
										<div className="p-1" key={command.key}>
											<Item icon={command.icon} text={command.label} tabFocus={true} action={(e: any) => insert(e, command.key)}>
												<div className="mt-2">{command.description}</div>
											</Item>
										</div>
									))}
									{options.length != index + 1 && <hr />}
								</div>
							))}
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			<input ref={inputRef} type="text" value={option} onFocus={() => setPlaceholder(localization.selectorText)} className="w-[100%] h-[1.8rem] bg-primary-light rounded-[5px] hover:bg-gray-300 flex items-center focus:outline-0 placeholder:text-[black] py-4 px-2 opacity-80 " placeholder={placeholder} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleLoseFocus} />
		</div>
	)
}
