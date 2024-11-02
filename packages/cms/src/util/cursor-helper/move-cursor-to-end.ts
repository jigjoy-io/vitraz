export const moveCursorToEndOff = (element: HTMLElement, offset: number = 0) => {
	const range = document.createRange()
	const selection = window.getSelection()

	const textContent = element.textContent || ""
	const position = Math.max(0, textContent.length - offset)

	range.setStart(element.firstChild || element, position)
	range.collapse(true)

	selection?.removeAllRanges()
	selection?.addRange(range)
}

export const moveCursorToEnd = (element: HTMLElement) => {
	const range = document.createRange()
	const selection = window.getSelection()

	range.selectNodeContents(element)
	range.collapse(false)

	selection?.removeAllRanges()
	selection?.addRange(range)
}
