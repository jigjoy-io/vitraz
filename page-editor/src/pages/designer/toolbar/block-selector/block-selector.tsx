import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createPortal } from "react-dom"
import { SelectorOptions } from "./selector-options"
import { useActiveBlock } from "../../../../util/store"
import { blockingUpdated } from "../../../../reducers/editor-reducer"
import TemplateFactory from "../../../../util/factories/templates/template-factory"
import { focusBlock, insertBlock } from "../../../../reducers/page-reducer"
import ClickOutsideListener from "../../../../util/click-outside-listener"
import Item from "../../../../components/item/item"
import { handleTextBlockKeyDown } from "../../../../util/factories/key-command-factory"

export default function BlockSelector(props: any) {
	const [option, setOption] = useState(props.option || "")
	const [options, setOptions] = useState([] as any)
	const [allOptions, setAllOptions] = useState([] as any)
	const [showMenu, setShowMenu] = useState(false)
	const [placeholder, setPlaceholder] = useState("Write something, or type '/' to insert...")
	const activeBlock = useActiveBlock()
	const inputRef = useRef<HTMLInputElement>(null)
	const [top, setTop] = useState(-500)
	const [left, setLeft] = useState()

	const dispatch = useDispatch()

	useEffect(() => {
		const selectorOptions = SelectorOptions.getOptions()

		setOptions(selectorOptions)
		setAllOptions(selectorOptions)

		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (activeBlock == props.id) inputRef.current?.focus()
	}, [activeBlock])

	const filterCommands = (option: any, value: any, index: number) => {
		option.commands = allOptions[index].commands.filter((command: any) =>
			command.label.toLowerCase().includes(value.slice(1).toLowerCase()),
		)
		return option
	}

	function setMenuPosition() {
		if (inputRef.current) {
			let rect: any = inputRef.current.getBoundingClientRect()

			setLeft(rect.width)

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
		setOption(props.option)
	}, [props.option])

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

			let result = temp.filter((option: any) => option.commands.length > 0)

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
		})
	}

	const closeMenu = () => {
		dispatch(blockingUpdated(false))
		setShowMenu(false)
	}

	const insert = (event: any, type: string) => {
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
						<div
							style={{ top: top, left: left, transform: `translate(-100%, -${calculateY()}%)` }}
							className={`fixed flex flex-col w-[100%] md:max-w-[340px] h-auto max-h-[400px] overflow-y-auto bg-white shadow rounded-lg -translate-x-[100%]`}
						>
							{options.map((option: any, index: number) => (
								<div key={option.key}>
									{option.commands.map((command: any) => (
										<div key={command.key}>
											<Item
												icon={command.icon}
												text={command.label}
												tabFocus={true}
												action={(e: any) => insert(e, command.key)}
											></Item>
										</div>
									))}
									{options.length != index + 1 && <hr className="border-default-light" />}
								</div>
							))}
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			<input
				ref={inputRef}
				type="text"
				value={option}
				onFocus={() => setPlaceholder(placeholder)}
				className="w-full h-10 bg-white rounded-md outline-none"
				placeholder={placeholder}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={handleLoseFocus}
			/>
		</div>
	)
}
