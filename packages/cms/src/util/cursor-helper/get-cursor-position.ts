export const getCursorPosition = (element: HTMLElement): number => {
	const selection = window.getSelection()
	if (selection && selection.rangeCount > 0) {
		const range = selection.getRangeAt(0)
		const preCaretRange = document.createRange()
		preCaretRange.selectNodeContents(element)
		preCaretRange.setEnd(range.endContainer, range.endOffset)
		const contents = Array.from(element.childNodes)
		let position = 0

		for (let i = 0; i < contents.length; i++) {
			const node = contents[i]
			if (node === range.endContainer) {
				position += range.endOffset
				break
			} else if (node.nodeType === Node.TEXT_NODE) {
				position += node.textContent?.length || 0
			} else if (node.nodeName === "BR") {
				position += 1
			}
		}
		return position
	}
	return 0
}
