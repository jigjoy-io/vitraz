import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { focusBlock, insertBlock, updateBlock, removeBlock } from '../../../../reducers/page-reducer'
import { useActiveBlock, usePage } from '../../../../util/store'
import textEditingVariants from '../../../../util/style-helper/text-editing-variations'
import alignmentVariations from '../../../../util/style-helper/alignment-variations'
import TemplateFactory from '../../../../util/factories/templates/template-factory'
import { splitTextAtCursor } from '../../../../util/cursor-helper/split-text-at-cursor'
import { moveCursorToEndOff } from '../../../../util/cursor-helper/move-cursor-to-end'

export default function ContentEditingText(props: any) {
	const [position, setPosition] = useState(props.position)
	const [type, setType] = useState(props.type)
	const [style, setStyle] = useState({} as any)
	const page = usePage()

	const previousTextBlock = useSelector(() => {
		const blocks = page.config.buildingBlocks;
		const currentIndex = blocks.findIndex((block: any) => block.id === props.id);

		if (currentIndex <= 0) return null;

		for (let i = currentIndex - 1; i >= 0; i--) {
			if (blocks[i].type === "text" || blocks[i].type === "title" || blocks[i].type === "heading") {
				return blocks[i];
			}
		}

		return null;
	});

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	useEffect(() => {
		setStyle(textEditingVariants[type])
		setType(props.type)
	}, [props.type])

	const dispatch = useDispatch()
	const ref = useRef<HTMLDivElement>(null)
	const activeBlock = useActiveBlock()

	useEffect(() => {
		if (activeBlock === props.id) ref.current?.focus()
	}, [activeBlock])

	const updateText = (event: any) => {
		let newValue = event.target.innerText.trim()
		let block = {
			id: props.id,
			position: props.position,
			type: props.type,
			text: newValue,
		}
		dispatch(updateBlock(block))
	}

	const getCaretPosition = (element: HTMLElement): number => {
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

	const handleMergeWithPreviousBlock = () => {
		if (!previousTextBlock) {
			dispatch(removeBlock(props.id))
			return
		}

		const currentText = ref.current?.innerText || ""
		const prevBlockElement = document.querySelector(`[data-block-id="${previousTextBlock.id}"]`) as HTMLElement
		if (!prevBlockElement) return false

		const prevText = prevBlockElement.innerText
		const mergedText = prevText + currentText

		dispatch(updateBlock({
			...previousTextBlock,
			text: mergedText
		}))

		dispatch(removeBlock(props.id))

		dispatch(focusBlock(previousTextBlock.id))

		setTimeout(() => {
			const updatedPrevBlock = document.querySelector(`[data-block-id="${previousTextBlock.id}"]`) as HTMLElement
			if (updatedPrevBlock) {
				const range = document.createRange()
				const sel = window.getSelection()
				const textNode = updatedPrevBlock.firstChild || updatedPrevBlock

				range.setStart(textNode, prevText.length)
				range.collapse(true)
				sel?.removeAllRanges()
				sel?.addRange(range)
				updatedPrevBlock.focus()

				moveCursorToEndOff(prevBlockElement, currentText.length)
			}
		}, 50)

		return true
	}

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter" && event.shiftKey) {
			return
		} else if (event.key === "Enter") {
			event.preventDefault()
			if (!ref.current) return
			const caretPosition = getCaretPosition(ref.current)
			const text = ref.current?.innerText || ""
			const isCaretAtEnd = caretPosition === ref.current?.innerText.length
			const { beforeCursor, afterCursor } = splitTextAtCursor(text, caretPosition)

			let newBlock = TemplateFactory.create(props.type)
			if ((beforeCursor || afterCursor) && !isCaretAtEnd) {
				ref.current!.innerText = beforeCursor
				let updatedBlock = {
					id: props.id,
					position: props.position,
					type: props.type,
					text: beforeCursor,
				}
				dispatch(updateBlock(updatedBlock))
				newBlock.text = afterCursor
				dispatch(insertBlock({
					referenceBlock: props.id,
					block: newBlock,
					position: 'below'
				}))
				dispatch(focusBlock(newBlock.id))
				ref.current?.blur()
			} else if (isCaretAtEnd && !event.shiftKey) {
				let selector = TemplateFactory.createBlockSelector()
				dispatch(
					insertBlock({
						referenceBlock: props.id,
						block: selector,
						position: "below",
					}),
				)
				dispatch(focusBlock(selector.id))
			}
		} else if (event.key === 'Backspace') {
			const caretPosition = getCaretPosition(ref.current!)
			if (caretPosition === 0) {
				event.preventDefault()
				handleMergeWithPreviousBlock()
			}
		}
	}

	return (
		<div className={`inline-block w-[100%] ${style.lineHeight} ${alignmentVariations[position]}`}>
			<div contentEditable="plaintext-only" spellCheck="false" onKeyDown={handleKeyDown} onBlur={(e) => updateText(e)} data-block-id={props.id} className={`${style.class} w-[100%] [&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none`} ref={ref}>
				{props.text}
			</div>
		</div>
	)
}