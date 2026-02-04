import React, { useRef, useEffect, CSSProperties } from "react"
import { useDragLayer, XYCoord } from "react-dnd"

interface Block {
	id: string
	content: {
		text?: string
		displayQuestion?: string
		displayImage?: boolean
		image?: string
	}
}

interface CustomDragLayerProps {
	selectedBlocks: Block[]
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = ({ selectedBlocks }) => {
	const clonedElementsRef = useRef<HTMLDivElement[]>([])

	const { isDragging, initialCursorOffset, initialFileOffset, currentFileOffset } = useDragLayer((monitor) => ({
		initialCursorOffset: monitor.getInitialClientOffset(),
		initialFileOffset: monitor.getInitialSourceClientOffset(),
		currentFileOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}))

	useEffect(() => {
		clonedElementsRef.current = []

		selectedBlocks.forEach((block) => {
			const element = document.getElementById(block.id)
			if (element) {
				const clonedElement = element.cloneNode(true) as HTMLDivElement
				clonedElement.style.pointerEvents = "none"
				clonedElementsRef.current.push(clonedElement)
			}
		})
	}, [selectedBlocks])

	if (!isDragging) {
		return null
	}

	return (
		<div style={layerStyles}>
			{clonedElementsRef.current.map((clonedElement, index) => {
				const rect = clonedElement.getBoundingClientRect()

				return (
					<div
						key={index}
						style={{
							...getItemStyles(initialCursorOffset, initialFileOffset, currentFileOffset, index, rect),
						}}
						dangerouslySetInnerHTML={{ __html: clonedElement.outerHTML }}
					/>
				)
			})}
		</div>
	)
}

const layerStyles: CSSProperties = {
	position: "fixed",
	pointerEvents: "none",
	zIndex: 100,
	left: 0,
	top: 0,
	width: "100%",
	height: "100%",
	opacity: 0.3,
}

function getItemStyles(
	initialCursorOffset: XYCoord | null,
	initialOffset: XYCoord | null,
	currentOffset: XYCoord | null,
	index: number,
	rect: DOMRect,
): CSSProperties {
	if (!initialOffset || !currentOffset || !initialCursorOffset) {
		return {
			display: "none",
		}
	}

	const transform = `translate(${currentOffset.x + 60}px, ${currentOffset.y + 20}px)`

	return {
		transform,
		WebkitTransform: transform,
		width: "360px",
	}
}
