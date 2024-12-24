import { getCursorPosition } from "../../cursor-helper/get-cursor-position"
import { mergeWithPreviousBlock } from "../merge-blocks"
import { KeyCommand } from "./key-command"

export class BackspaceCommand extends KeyCommand {
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
