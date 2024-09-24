import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import TemplateFactory from '../../../factories/TemplateFactory'
import { insertBlock, updateBlock } from '../../../reducers/pageReducer'
import alignmentVariations from '../../../util/alignmentVariations'
import { useActiveBlock } from '../../../util/store'
import textEditingVariants from '../../../util/textEditingVariations'

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

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter' && event.shiftKey) {
			return
		}
		
		else if (event.key === 'Enter') {
			event.preventDefault()

			let selector = TemplateFactory.get("block-selector")

			dispatch(insertBlock({
				referenceBlock: props.id,
				block: selector
			}))

			ref.current?.blur()
		}
	}

	return (
		<div className={`inline-block w-[100%] ${style.lineHeight} ${alignmentVariations[position]}`}>
			<div
				contentEditable="plaintext-only"
				spellCheck="false"
				onKeyDown={handleKeyDown}
				onBlur={(e) => updateText(e)}
				className={`${style.class} w-[100%] [&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none`}
				ref={ref}>
				{props.text}
			</div>
		</div>
	)
}
