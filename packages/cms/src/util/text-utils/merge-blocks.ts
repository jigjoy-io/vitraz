import { focusBlock, removeBlock, updateBlock } from "../../reducers/page-reducer"
import { moveCursorToEnd, moveCursorToEndOff } from "../cursor-helper/move-cursor-to-end"

interface TextBlock {
	id: string
	text?: string
	[key: string]: any
}

export const mergeWithPreviousBlock = (currentBlock: TextBlock, previousBlock: TextBlock | null, currentText: string, dispatch: any): boolean => {
	if (!previousBlock) {
		if (!currentText) {
			dispatch(removeBlock(currentBlock.id))
		}
		return true
	}

	const prevBlockElement = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement

	const prevText = prevBlockElement.innerText
	const mergedText = prevText + currentText

	dispatch(
		updateBlock({
			...previousBlock,
			text: mergedText,
		}),
	)

	dispatch(removeBlock(currentBlock.id))
	dispatch(focusBlock(previousBlock.id))

	const updatedPrevBlock = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement

	if (updatedPrevBlock) {
		if (currentText.length) {
			setTimeout(() => {
				moveCursorToEndOff(prevBlockElement, currentText.length)
			}, 50)
		} else {
			moveCursorToEnd(prevBlockElement)
		}
	}

	return true
}
