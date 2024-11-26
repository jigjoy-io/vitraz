export interface DropStrategy {
	execute(
		dropTarget: { index: number; position: "top" | "bottom" } | null,
		selectedBlocks: any[],
		blocks: any[],
		page: any,
		activeCarousel: string | null,
		dispatch: any,
		setDropTarget: (target: { index: number; position: "top" | "bottom" } | null) => void,
		item: any,
	): void
}
