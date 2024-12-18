import { insertBlock, removeBlock } from "../../../reducers/page-reducer"
import TemplateFactory from "../../factories/templates/template-factory"
import { setCaretPosition } from "../merge-blocks"
import { CaretPositionStrategy } from "./caret-position-strategy"
import { KeyCommand } from "./key-command"

export class ShiftEnterCommand extends KeyCommand {
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
