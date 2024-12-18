import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import { useActiveBlock } from "../../../../util/store"
import textEditingVariants from "../../../../util/style-helper/text-editing-variations"
import alignmentVariations from "../../../../util/style-helper/alignment-variations"
import { handleTextBlockKeyDown } from "../../../../util/factories/key-command-factory"

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

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		handleTextBlockKeyDown({
			event,
			dispatch,
			blockId: props.id,
			blockType: props.type,
			ref,
		})
	}

	return (
		<div className={`inline-block w-[100%] ${style.lineHeight} ${alignmentVariations[position]}`}>
			<div
				contentEditable="plaintext-only"
				suppressContentEditableWarning={true}
				spellCheck="false"
				onKeyDown={handleKeyDown}
				onBlur={(e) => updateText(e)}
				data-block-id={props.id}
				className={`${style.class} w-[100%] [&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none`}
				ref={ref}
			>
				{props.text}
			</div>
		</div>
	)
}
