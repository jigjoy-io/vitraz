import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import CarouselIcon from "../../icons/carousel-icon"
import Button from "../button/button"
import Checkbox from "../checkbox/checkbox"
import Tabs from "../tabs/tabs"
import ClickOutsideListener from "../../util/click-outside-listener"
import Tab from "../tabs/tab"
import { updateBlock } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { usePage } from "../../util/store"
import { createPortal } from "react-dom"
import { blockingUpdated } from "../../reducers/editor-reducer"
import TemplateFactory from "../../util/factories/templates/template-factory"

export default function CarouselConfigurer(props: any) {
	const dispatch = useDispatch()

	const [display, setDisplay] = useState(props.display)
	const [accessType, setAccessType] = useState(props.accessType)
	const [numberOfPages, setNumberOfPages] = useState(props.numberOfPages)
	const [description, setDescription] = useState(props.description)
	const [title, setHeadline] = useState(props.title)
	const activePage = usePage()

	const [top, setTop] = useState<number>()
	const [left, setLeft] = useState<number>()
	const [y, setY] = useState(0)

	const ref = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (ref.current) {
			let contentRect = ref.current.getBoundingClientRect()

			if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
				setY(-100)
			} else {
				setY(0)
			}

			setTop(contentRect.top)
			setLeft(contentRect.left + contentRect.width / 2)
		}
	}, [display])

	const openConfigurer = () => {
		setDisplay(true)
		dispatch(blockingUpdated(true))
	}

	/**
	 * Creates a carousel block with multiple pages and replace carousel configurer block with newly created carousel tile.
	 * @returns None
	 */
	const create = () => {
		dispatch(blockingUpdated(false))

		let block = TemplateFactory.createCarouselTileBlock(activePage.id, numberOfPages)
		block.title = title
		block.description = description

		// replace configurer with carousel block tile
		block.id = props.id

		dispatch(updateBlock(block))
	}

	const turnOffPopup = () => {
		let block = JSON.parse(JSON.stringify(props))
		block.display = false
		dispatch(updateBlock(block))
	}

	const onClose = () => {
		dispatch(blockingUpdated(false))
		setDisplay(false)
		turnOffPopup()
	}

	useEffect(() => {
		window.onbeforeunload = function () {
			turnOffPopup()
			return true
		}

		return () => {
			window.onbeforeunload = null
		}
	}, [])

	return (
		<div>
			{display &&
				createPortal(
					<ClickOutsideListener callback={onClose}>
						<div
							style={{
								width: 400,
								pointerEvents: "auto",
								top: top,
								left: left,
								transform: `translate(-50%, ${y}%)`,
							}}
							className="fixed bg-[white] rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50"
						>
							<div className="p-[5%]">
								<div>
									<Tabs>
										<Tab key="Carousel Settings">
											<div className="w-[100%] mt-[1rem]">
												<div className="flex flex-row w-full">
													<label className="flex-none flex items-center w-[33%]" htmlFor="headline">
														Title:
													</label>
													<input
														className="ml-4 p-1 rounded-[5px] border w-[100%]"
														value={title}
														onChange={(e: any) => setHeadline(e.target.value)}
													/>
												</div>
											</div>

											<div className="w-[100%] mt-[1rem]">
												<div className="flex flex-row w-full">
													<label className="flex-none flex items-center w-[33%]" htmlFor="headline">
														Description:
													</label>
													<input
														className="ml-4 p-1 rounded-[5px] border w-[100%]"
														value={description}
														onChange={(e: any) => setDescription(e.target.value)}
													/>
												</div>
											</div>

											<div className="w-[100%] mt-[1rem]">
												<div className="flex flex-row w-full">
													<label className="flex-none flex items-center w-[33%]" htmlFor="numberOfPages">
														Number of pages:
													</label>
													<input
														className="ml-4 p-1 rounded-[5px] border w-[100%]"
														type="number"
														min={1}
														value={numberOfPages}
														onChange={(e: any) => setNumberOfPages(e.target.value)}
													/>
												</div>
											</div>
										</Tab>

										<Tab key="Access Type">
											<div className="w-[100%]">
												<div className="opacity-30">Coming soon!</div>
												<div className="flex flex-row w-full mt-3 gap-3">
													<Checkbox
														disabled={true}
														selected={accessType == "freebie"}
														onChange={() => setAccessType("freebie")}
													>
														Freebie
													</Checkbox>
													<Checkbox
														disabled={true}
														selected={accessType == "lead magnet"}
														onChange={() => setAccessType("lead magnet")}
													>
														Lead magnet
													</Checkbox>
													<Checkbox
														disabled={true}
														selected={accessType == "paid"}
														onChange={() => setAccessType("paid")}
													>
														Paid
													</Checkbox>
												</div>
											</div>
										</Tab>
									</Tabs>

									<div className="mt-[1rem]">
										<Button width="w-full" text="Create" action={create} />
									</div>
								</div>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}
			<div
				ref={ref}
				onClick={openConfigurer}
				className="w-[100%] py-[8px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-[5px] flex items-center pl-5 hover:opacity-60"
			>
				<CarouselIcon />
				<div className="pl-2">Click to add a carousel</div>
			</div>
		</div>
	)
}
