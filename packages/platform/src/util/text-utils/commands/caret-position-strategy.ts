import { getCursorPosition } from "../../cursor-helper/get-cursor-position"
import { splitTextAtCursor } from "../../cursor-helper/split-text-at-cursor"
import { CaretContext } from "./caret-context"

export class CaretPositionStrategy {
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
