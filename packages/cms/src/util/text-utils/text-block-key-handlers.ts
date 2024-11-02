import { splitTextAtCursor } from "../cursor-helper/split-text-at-cursor"
import { moveCursorToEnd } from "../cursor-helper/move-cursor-to-end"
import TemplateFactory from "../factories/templates/template-factory"
import { focusBlock, insertBlock, updateBlock } from "../../reducers/page-reducer"
import { getCursorPosition } from "../cursor-helper/get-cursor-position"
import { mergeWithPreviousBlock } from "./merge-blocks"

interface KeyHandlerContext {
	event: React.KeyboardEvent
	dispatch: any
	blockId: string
	blockType: string
	position?: string
	ref?: React.RefObject<HTMLElement>
	currentText?: string
	options?: {
		onClose?: () => void
		setOption?: (value: string) => void
	}
	previousBlock?: any
}

interface CaretContext {
	caretPosition: number
	isCaretAtEnd: boolean
	text: string
	beforeCursor: string
	afterCursor: string
}

const getCaretContext = (element: HTMLElement | HTMLInputElement): CaretContext => {
	const isInput = element instanceof HTMLInputElement
	const caretPosition = isInput ? element.selectionStart || 0 : getCursorPosition(element)

	const text = isInput ? element.value : element.innerText
	const isCaretAtEnd = caretPosition === text.length
	const { beforeCursor, afterCursor } = splitTextAtCursor(text, caretPosition)

	return {
		caretPosition,
		isCaretAtEnd,
		text,
		beforeCursor,
		afterCursor,
	}
}

const handleShiftEnter = async (context: KeyHandlerContext) => {
	const { event, dispatch, blockId, ref, options, blockType } = context

	if (blockType !== "block-selector") {
		return
	}

	event.preventDefault()

	const value = (event.target as HTMLInputElement).value || ""

	const block = TemplateFactory.createTextBlock(value)

	dispatch(
		insertBlock({
			referenceBlock: blockId,
			block,
			position: "above",
		}),
	)

	dispatch(focusBlock(block.id))

	if (ref?.current) {
		const { caretPosition, isCaretAtEnd } = getCaretContext(ref.current)

		setTimeout(() => {
			const newTextBlock = document.querySelector(`[data-block-id="${block.id}"]`) as HTMLElement

			if (newTextBlock) {
				moveCursorToEnd(newTextBlock)
				const text = newTextBlock.innerText || ""

				if (!isCaretAtEnd) {
					const beforeCursor = text.slice(0, caretPosition).trim()
					const afterCursor = text.slice(caretPosition).trim()
					newTextBlock.innerText = beforeCursor + "\n" + afterCursor
				} else {
					newTextBlock.innerText = newTextBlock.innerText + "\n\n"
				}

				moveCursorToEnd(newTextBlock)
			}
		}, 50)
	}

	if (options?.setOption) {
		options.setOption("")
	}
}

const handleEnter = (context: KeyHandlerContext) => {
	const { event, dispatch, blockId, blockType, ref, options } = context
	event.preventDefault()

	if (!ref?.current) return

	const { isCaretAtEnd, beforeCursor, afterCursor } = getCaretContext(ref.current)

	if ((beforeCursor || afterCursor) && !isCaretAtEnd) {
		if (blockType !== "block-selector") {
			ref.current.innerText = beforeCursor
			dispatch(
				updateBlock({
					id: blockId,
					text: beforeCursor,
					type: blockType,
				}),
			)
		} else {
			let blockBefore = TemplateFactory.createTextBlock(beforeCursor)

			dispatch(
				insertBlock({
					referenceBlock: blockId,
					block: blockBefore,
					position: "above",
				}),
			)
		}

		let blockAfter = TemplateFactory.createTextBlock(afterCursor)
		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: blockAfter,
				position: blockType === "block-selector" ? "above" : "below",
			}),
		)

		dispatch(focusBlock(blockAfter.id))
	} else if (isCaretAtEnd) {
		const value = (event.target as HTMLInputElement).value || ""
		const newBlock = TemplateFactory.createTextBlock(value)

		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: newBlock,
				position: blockType === "block-selector" ? "above" : "below",
			}),
		)

		if (blockType !== "block-selector") dispatch(focusBlock(newBlock.id))
	}

	if (options?.setOption) {
		options.setOption("")
	}
	if (options?.onClose) {
		options.onClose()
	}
}

const handleBackspace = (context: KeyHandlerContext) => {
	const { event, ref, previousBlock, blockId, dispatch } = context

	if (!ref?.current) return

	const isInput = ref.current instanceof HTMLInputElement
	const caretPosition = isInput ? (ref.current.selectionStart ?? 0) : getCursorPosition(ref.current)

	if (caretPosition === 0) {
		event.preventDefault()
		const currentText = isInput ? ref.current.value : ref.current.innerText || ""
		return mergeWithPreviousBlock({ id: blockId }, previousBlock, currentText, dispatch)
	}
}

export const handleTextBlockKeyDown = (context: KeyHandlerContext) => {
	const { event } = context

	switch (event.key) {
		case "Enter":
			if (event.shiftKey) {
				return handleShiftEnter(context)
			}
			return handleEnter(context)

		case "Backspace":
			return handleBackspace(context)

		default:
			break
	}
}
