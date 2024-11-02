export const moveCursor = (
	element: HTMLElement,
	options: {
		offset?: number
		useContents?: boolean
	} = {},
) => {
	const { offset = 0, useContents = false } = options
	const range = document.createRange()
	const selection = window.getSelection()

	if (useContents) {
		range.selectNodeContents(element)
		range.collapse(false)
	} else {
		const textContent = element.textContent || ""
		const position = offset < 0 ? Math.max(0, textContent.length + offset) : Math.min(offset, textContent.length)
		range.setStart(element.firstChild || element, position)
		range.collapse(true)
	}

	selection?.removeAllRanges()
	selection?.addRange(range)
}

export const moveCursorToEnd = (element: HTMLElement) => moveCursor(element, { useContents: true })

export const moveCursorToEndOff = (element: HTMLElement, offset: number) => moveCursor(element, { offset: -offset })
