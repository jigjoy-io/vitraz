import { splitTextAtCursor } from "../cursor-helper/split-text-at-cursor"
import { moveCursorToEnd } from "../cursor-helper/move-cursor-to-end"
import TemplateFactory from "../factories/templates/template-factory"
import { focusBlock, insertBlock, removeBlock, updateBlock } from "../../reducers/page-reducer"
import { getCursorPosition } from "../cursor-helper/get-cursor-position"
import { mergeWithPreviousBlock, setCaretPosition } from "./merge-blocks"
import { findNextBlock } from "./use-text-block"

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
}

interface CaretContext {
	caretPosition: number
	isCaretAtEnd: boolean
	text: string
	beforeCursor: string
	afterCursor: string
}

abstract class KeyCommand {
	protected context: KeyHandlerContext

	constructor(context: KeyHandlerContext) {
		this.context = context
	}

	abstract execute(): void
}

class CaretPositionStrategy {
	static getContext(element: HTMLElement | HTMLInputElement): CaretContext {
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
}

class ShiftEnterCommand extends KeyCommand {
	async execute(): Promise<void> {
		try {
			const { event, dispatch, blockId, ref, options, blockType } = this.context

			if (blockType !== "block-selector") return

			if (!event.target) {
				throw new Error("Event target is undefined")
			}

			event.preventDefault()

			let text = (event.target as HTMLInputElement).value || ""

			if (!ref?.current) return

			const { caretPosition, isCaretAtEnd } = CaretPositionStrategy.getContext(ref.current)

			await new Promise((resolve) => setTimeout(resolve, 50))

			if (!isCaretAtEnd) {
				const beforeCursor = text.slice(0, caretPosition).trim()
				const afterCursor = text.slice(caretPosition).trim()
				text = `${beforeCursor}\n${afterCursor}`
			} else {
				text = `${text}\n\n`
			}

			const block = TemplateFactory.createTextBlock(text)

			dispatch(
				insertBlock({
					referenceBlock: blockId,
					block,
					position: "above",
				}),
			)

			dispatch(removeBlock(blockId))

			if (!isCaretAtEnd) {
				const beforeCursor = text.slice(0, caretPosition).trim()
				const afterCursor = text.slice(caretPosition).trim()
				text = `${beforeCursor}\n${afterCursor}`
			} else {
				text = `${text}\n\n`
			}

			setTimeout(() => {
				let prevBlockElement = document.querySelector(`[data-block-id="${block.id}"]`) as HTMLElement

				setCaretPosition(prevBlockElement, caretPosition + 1)
			}, 25)
		} catch (error) {
			console.error("Error in ShiftEnterCommand execute:", error)
			throw error
		}
	}
}

class EnterCommand extends KeyCommand {
	execute(): void {
		const { event, ref, options } = this.context
		event.preventDefault()

		if (!ref?.current) return

		const caretContext = CaretPositionStrategy.getContext(ref.current)

		if (this.shouldSplitBlock(caretContext)) {
			this.handleBlockSplit(caretContext)
		} else if (caretContext.isCaretAtEnd) {
			this.handleEndOfBlock()
		}

		options?.setOption?.("")
		options?.onClose?.()
	}

	private shouldSplitBlock(context: CaretContext): any {
		const { beforeCursor, afterCursor, isCaretAtEnd } = context
		return (beforeCursor || afterCursor) && !isCaretAtEnd
	}

	private handleBlockSplit(context: CaretContext): void {
		const { beforeCursor, afterCursor } = context
		const { dispatch, blockId, blockType } = this.context

		if (blockType !== "block-selector") {
			this.updateCurrentBlock(beforeCursor)
		} else {
			this.insertBlockAbove(beforeCursor)
		}

		const blockAfter = TemplateFactory.createTextBlock(afterCursor)
		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: blockAfter,
				position: blockType === "block-selector" ? "above" : "below",
			}),
		)

		dispatch(focusBlock(blockAfter.id))
	}

	private handleEndOfBlock(): void {
		const { dispatch, blockId, blockType, event } = this.context

		if (blockType === "block-selector") {
			const value = (event.target as HTMLInputElement).value || ""
			const newBlock = TemplateFactory.createTextBlock(value)

			dispatch(
				insertBlock({
					referenceBlock: blockId,
					block: newBlock,
					position: "above",
				}),
			)
		} else {
			let nextBlock: any = findNextBlock(blockId)

			if (nextBlock && nextBlock.type == "block-selector") {
				dispatch(focusBlock(nextBlock.id))
			} else {
				const newBlock = TemplateFactory.createBlockSelector()
				dispatch(
					insertBlock({
						referenceBlock: blockId,
						block: newBlock,
						position: "below",
					}),
				)
				dispatch(focusBlock(newBlock.id))
			}
		}
	}

	private updateCurrentBlock(text: string): void {
		const { dispatch, blockId, blockType, ref } = this.context
		if (!ref?.current) return

		ref.current.innerText = text
		dispatch(
			updateBlock({
				id: blockId,
				text,
				type: blockType,
			}),
		)
	}

	private insertBlockAbove(text: string): void {
		const { dispatch, blockId } = this.context
		const blockBefore = TemplateFactory.createTextBlock(text)

		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: blockBefore,
				position: "above",
			}),
		)
	}
}

class BackspaceCommand extends KeyCommand {
	execute(): void {
		const { event, ref, blockId, dispatch } = this.context

		if (!ref?.current) return

		const isInput = ref.current instanceof HTMLInputElement
		const caretPosition = isInput ? (ref.current.selectionStart ?? 0) : getCursorPosition(ref.current)

		if ((!isInput && !ref.current.innerText.trim()) || caretPosition === 0) {
			event.preventDefault()
			const currentText = isInput ? ref.current.value : ref.current.innerText || ""
			mergeWithPreviousBlock({ id: blockId }, currentText, dispatch)
		}
	}
}

class KeyCommandFactory {
	static createCommand(event: React.KeyboardEvent, context: KeyHandlerContext): KeyCommand | null {
		switch (event.key) {
			case "Enter":
				return event.shiftKey ? new ShiftEnterCommand(context) : new EnterCommand(context)
			case "Backspace":
				return new BackspaceCommand(context)
			default:
				return null
		}
	}
}

export const handleTextBlockKeyDown = (context: KeyHandlerContext): void => {
	const command = KeyCommandFactory.createCommand(context.event, context)
	command?.execute()
}
