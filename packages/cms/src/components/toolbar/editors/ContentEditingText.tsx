import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import TemplateFactory from '../../../factories/TemplateFactory'
import { focusBlock, insertBlock, updateBlock } from '../../../reducers/pageReducer'
import alignmentVariations from '../../../util/alignmentVariations'
import { useActiveBlock } from '../../../util/store'
import textEditingVariants from '../../../util/textEditingVariations'
import { moveCursorToEnd } from '../../../util/traversals/moveCursorToEnd'

export default function ContentEditingText(props: any) {

	const [position, setPosition] = useState(props.position)
	const [type, setType] = useState(props.type)
	const [style, setStyle] = useState({} as any)

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
		if (activeBlock === props.id)
			ref.current?.focus()
	}, [activeBlock])

	const updateText = (event: any) => {
		let newValue = event.target.innerText.trim()

		let block = {
			id: props.id,
			position: props.position,
			type: props.type,
			text: newValue
		}

		dispatch(updateBlock(block))
	}

	const getCaretPosition = (element: HTMLElement): number => {
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const preCaretRange = document.createRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);

			const contents = Array.from(element.childNodes);
			let position = 0;

			for (let i = 0; i < contents.length; i++) {
				const node = contents[i];
				if (node === range.endContainer) {
					position += range.endOffset;
					break;
				} else if (node.nodeType === Node.TEXT_NODE) {
					position += node.textContent?.length || 0;
				} else if (node.nodeName === 'BR') {
					position += 1;
				}
			}

			return position;
		}
		return 0;
	}


	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter' && event.shiftKey) {
			return
		} else if (event.key === 'Enter') {
			event.preventDefault()

			if (!ref.current) return;

			const caretPosition = getCaretPosition(ref.current);
			const text = ref.current?.innerText || ""
			const isCaretAtEnd = caretPosition === ref.current?.innerText.length;

			const beforeCursor = text.slice(0, caretPosition).trim()
			const afterCursor = text.slice(caretPosition).trim()

			let newBlock = TemplateFactory.get(props.type)

			if ((beforeCursor || afterCursor) && !isCaretAtEnd) {
				ref.current!.innerText = beforeCursor;

				let updatedBlock = {
					id: props.id,
					position: props.position,
					type: props.type,
					text: beforeCursor
				};
				dispatch(updateBlock(updatedBlock))

				newBlock.text = afterCursor

				dispatch(insertBlock({
					referenceBlock: props.id,
					block: newBlock,
					position: 'below'
				}))

				dispatch(focusBlock(newBlock.id))

				ref.current?.blur()
			} else if (isCaretAtEnd) {
				let selector = TemplateFactory.get("block-selector")
				dispatch(insertBlock({
					referenceBlock: props.id,
					block: selector,
					position: 'below'
				}))
				dispatch(focusBlock(newBlock.id))
			}
		}
	};

	return (
		<div className={`inline-block w-[100%] ${style.lineHeight} ${alignmentVariations[position]}`}>
			<div
				contentEditable="plaintext-only"
				spellCheck="false"
				onKeyDown={handleKeyDown}
				onBlur={(e) => updateText(e)}
				data-block-id={props.id}
				className={`${style.class} w-[100%] [&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none`}
				ref={ref}>
				{props.text}
			</div>
		</div>
	)
}
