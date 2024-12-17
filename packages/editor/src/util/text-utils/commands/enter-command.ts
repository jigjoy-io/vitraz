import { focusBlock, insertBlock, updateBlock } from "../../../reducers/page-reducer"
import TemplateFactory from "../../factories/templates/template-factory"
import { findNextBlock } from "../use-text-block"
import { CaretContext } from "./caret-context"
import { CaretPositionStrategy } from "./caret-position-strategy"
import { KeyCommand } from "./key-command"

export class EnterCommand extends KeyCommand {
	execute(): void {
		const { event, ref, options } = this.context
		event.preventDefault()

		if (!ref?.current) return

		const caretContext = CaretPositionStrategy.getContext(ref.current)

		if (this.shouldSplitBlock(caretContext)) {
			this.handleBlockSplit(caretContext)
		} else if (caretContext.isCaretAtEnd) {
			this.handleEndOfBlock()
		}

		options?.setOption?.("")
		options?.onClose?.()
	}

	private shouldSplitBlock(context: CaretContext): any {
		const { beforeCursor, afterCursor, isCaretAtEnd } = context
		return (beforeCursor || afterCursor) && !isCaretAtEnd
	}

	private handleBlockSplit(context: CaretContext): void {
		const { beforeCursor, afterCursor } = context
		const { dispatch, blockId, blockType } = this.context

		if (blockType !== "block-selector") {
			this.updateCurrentBlock(beforeCursor)
		} else {
			this.insertBlockAbove(beforeCursor)
		}

		const blockAfter = TemplateFactory.createTextBlock(afterCursor)
		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: blockAfter,
				position: blockType === "block-selector" ? "above" : "below",
			}),
		)

		dispatch(focusBlock(blockAfter.id))
	}

	private handleEndOfBlock(): void {
		const { dispatch, blockId, blockType, event } = this.context

		if (blockType === "block-selector") {
			const value = (event.target as HTMLInputElement).value || ""
			const newBlock = TemplateFactory.createTextBlock(value)

			dispatch(
				insertBlock({
					referenceBlock: blockId,
					block: newBlock,
					position: "above",
				}),
			)
		} else {
			let nextBlock: any = findNextBlock(blockId)

			if (nextBlock && nextBlock.type == "block-selector") {
				dispatch(focusBlock(nextBlock.id))
			} else {
				const newBlock = TemplateFactory.createBlockSelector()
				dispatch(
					insertBlock({
						referenceBlock: blockId,
						block: newBlock,
						position: "below",
					}),
				)
				dispatch(focusBlock(newBlock.id))
			}
		}
	}

	private updateCurrentBlock(text: string): void {
		const { dispatch, blockId, blockType, ref } = this.context
		if (!ref?.current) return

		ref.current.innerText = text
		dispatch(
			updateBlock({
				id: blockId,
				text,
				type: blockType,
			}),
		)
	}

	private insertBlockAbove(text: string): void {
		const { dispatch, blockId } = this.context
		const blockBefore = TemplateFactory.createTextBlock(text)

		dispatch(
			insertBlock({
				referenceBlock: blockId,
				block: blockBefore,
				position: "above",
			}),
		)
	}
}
