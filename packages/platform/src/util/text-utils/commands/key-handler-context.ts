export interface KeyHandlerContext {
	event: React.KeyboardEvent
	dispatch: any
	blockId: string
	blockType: string
	position?: string
	ref?: React.RefObject<HTMLElement>
	currentText?: string
	options?: {
		onClose?: () => void
		setOption?: (value: string) => void
	}
}
