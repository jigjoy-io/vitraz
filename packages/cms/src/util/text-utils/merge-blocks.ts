import { focusBlock, removeBlock, updateBlock } from "../../reducers/page-reducer"
import { findPreviousTextBlock } from "./use-text-block"

interface TextBlock {
	id: string
	text?: string
	[key: string]: any
}

export function setCaretPosition(el, pos) {
	// Loop through all child nodes

	for (var node of el.childNodes) {
		if (node.nodeType == 3) {
			// we have a text node
			if (node.length >= pos) {
				const range = document.createRange()
				const selection = window.getSelection()

				range.setStart(node, pos)
				range.collapse(true)

				selection?.removeAllRanges()
				selection?.addRange(range)
				return -1
			}
		} else {
			pos = setCaretPosition(node, pos)
			if (pos == -1) {
				return -1 // no need to finish the for loop
			}
		}
	}
	return pos // needed because of recursion stuff
}

export const mergeWithPreviousBlock = (currentBlock: TextBlock, currentText: string, dispatch: any): boolean => {
	const previousBlock = findPreviousTextBlock(currentBlock.id)
	if (!previousBlock) {
		dispatch(removeBlock(currentBlock.id))
		return true
	}

	let prevBlockElement = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement

	const prevText = prevBlockElement.innerText
	const mergedText = prevText + currentText

	dispatch(removeBlock(currentBlock.id))

	if (mergedText == "" || previousBlock.type == "block-selector") {
		dispatch(
			updateBlock({
				...previousBlock,
				option: mergedText,
			}),
		)

		setTimeout(() => {
			dispatch(focusBlock(previousBlock.id))
		}, 25)
	} else {
		dispatch(
			updateBlock({
				...previousBlock,
				text: mergedText,
			}),
		)

		setTimeout(() => {
			setCaretPosition(prevBlockElement, prevText.length)
		}, 50)
	}

	return true
}
