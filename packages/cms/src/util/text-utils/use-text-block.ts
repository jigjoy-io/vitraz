interface Block {
	id: string
	type: string
	[key: string]: any
}

export const findPreviousTextBlock = (
	blocks: Block[],
	currentBlockId: string,
	validTypes: string[] = ["text", "title", "heading", "block-selector"],
): Block | null => {
	const currentIndex = blocks?.findIndex((block) => block.id === currentBlockId)

	if (currentIndex <= 0) return null

	for (let i = currentIndex - 1; i >= 0; i--) {
		if (validTypes.includes(blocks[i].type)) {
			return blocks[i]
		}
	}

	return null
}

export const findPreviousBlock = (blocks: Block[], currentBlockId: string): Block | null => {
	const currentIndex = blocks?.findIndex((block) => block.id === currentBlockId)

	const previousBlock = currentIndex - 1
	if (!blocks || previousBlock < 0) return null
	return blocks[previousBlock]
}

export const findNextBlock = (blocks: Block[], currentBlockId: string): Block | null => {
	const currentIndex = blocks?.findIndex((block) => block.id === currentBlockId)

	const nextBlock = currentIndex + 1
	if (!blocks || nextBlock >= blocks.length) return null
	return blocks[nextBlock]
}
