import { focusBlock, removeBlock, updateBlock } from "../../reducers/page-reducer"
import { moveCursorToEnd, moveCursorToEndOff } from "../cursor-helper/move-cursor-to-end"

interface TextBlock {
	id: string
	text?: string
	[key: string]: any
}

export const mergeWithPreviousBlock = (currentBlock: TextBlock, previousBlock: TextBlock | null, currentText: string, dispatch: any): boolean => {
	if (!previousBlock) {
		dispatch(removeBlock(currentBlock.id))
		return true
	}

	const prevBlockElement = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement

	if (!prevBlockElement) {
		dispatch(removeBlock(currentBlock.id))
		return false
	}

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
		setTimeout(() => {
			moveCursorToEndOff(prevBlockElement, prevText.length)
		}, 50)
	}

	return true
}
